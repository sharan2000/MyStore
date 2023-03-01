import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    closeSub: Subscription;

    constructor(private authService: AuthService, private router : Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnDestroy() {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
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
                // this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        });
        authForm.reset();
    }

    showErrorAlert(errorMessage: string) {
        let viewContainerRef = this.alertHost.viewContainerRef;
        let compRef = viewContainerRef.createComponent(AlertComponent);

        compRef.instance.message = errorMessage;
        this.closeSub = compRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            viewContainerRef.clear();
        });
    }
}