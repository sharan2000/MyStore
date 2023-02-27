import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        let recipes = this.recipeService.getRecipes();
        this.http.put(
            "https://backend-store-9d74d-default-rtdb.firebaseio.com/recipes.json", 
            recipes
        ).subscribe();
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            "https://backend-store-9d74d-default-rtdb.firebaseio.com/recipes.json"
        )
        .pipe(map((recipes) => {
            return recipes.map((recipe) => {
                return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []};
            });
        }),tap((recipes) => {
            this.recipeService.setRecipes(recipes);
        })
        )
    }
}