import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:"app-header",
    templateUrl:"./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    userSubscription : Subscription;

    constructor(private dataStorageService : DataStorageService, private authService : AuthService) {}

    ngOnInit() {
        this.userSubscription = this.authService.user.subscribe({
            next: (user) => {
                this.isAuthenticated = user ? true : false;
            }
        });
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    saveData() {
        this.dataStorageService.storeRecipes();
    }
    fetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
    onLogout(){
        this.authService.logout();
    }
}