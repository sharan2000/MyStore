import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error = null;

    constructor(private authService: AuthService, private router : Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm : NgForm) {
        if(!authForm.valid) { return; }
        const email = authForm.value.email;
        const password = authForm.value.password;

        let authObservable : Observable<AuthResponseData>;

        if(this.isLoginMode) {
            authObservable = this.authService.login(email, password);
        } else {
            authObservable = this.authService.signUp(email, password);
        }

        this.isLoading = true;
        authObservable.subscribe({
            next: (responseData) => {
                this.isLoading = false;
                this.router.navigate(["/recipes"]);
            },
            error: (errorMessage) => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        });
        authForm.reset();
    }

    onDismiss() {
        this.error = null;
    }
}