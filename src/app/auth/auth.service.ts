import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, throwError, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered? : boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);

    tokenExpirationTimer: any;

    private API_KEY = 'Your firebase api key';

    constructor(private http : HttpClient, private router: Router) {}

    signUp(email:string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, 
            {
                'email' : email,
                'password' : password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleErrorResponse), tap((ResponseData) => {
            this.handleAuthentication(
                ResponseData.email,
                ResponseData.localId,
                ResponseData.idToken,
                +ResponseData.expiresIn
            );
        }));
    }

    login(email:string, password: string) {
        return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
            {
                'email' : email,
                'password' : password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleErrorResponse), tap((ResponseData) => {
            this.handleAuthentication(
                ResponseData.email,
                ResponseData.localId,
                ResponseData.idToken,
                +ResponseData.expiresIn
            );
        }));
    }

    autoLogin() {
        let userData: {email : string, id: string, _token:string, _tokenExpirationDate:string} = JSON.parse(localStorage.getItem('user'));
        if(!userData) {
            return;
        }
        let tokenExpDate = new Date(userData._tokenExpirationDate);
        let currentUser = new User(
            userData.email,
            userData.id,
            userData._token,
            tokenExpDate
        );
        if(currentUser.token) {
            this.user.next(currentUser);
            const expDuration = tokenExpDate.getTime() - new Date().getTime();
            this.autoLogout(expDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem('user');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthentication(email:string, id:string, token:string, expiresIn:number) {
        let expiryDate = new Date(Date.now() + (expiresIn * 1000));
        let newUser = new User(email, id, token, expiryDate);
        this.user.next(newUser);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('user', JSON.stringify(newUser));
    }

    private handleErrorResponse(errorResponse : HttpErrorResponse) {
        let errorMessage = "some unexpected error has occured";
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "email already exists";
                break;
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
                errorMessage = "invalid credentials";
                break;
        }
        return throwError(() => errorMessage);
    }
}