import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({
    providedIn:"root"
})
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    constructor(public shoppingListService : ShoppingListService) {}

    private recipes : Recipe[] = [
        new Recipe(
            "Ham Burger", 
            "It is a long established fact", 
            "https://cdn.pixabay.com/photo/2013/06/09/06/07/meat-123668__340.jpg",
            [new Ingredient("meat", 1), new Ingredient("buns", 2)]
        ),
        new Recipe(
            "Pizza", 
            "It is a long established fact", 
            "https://cdn.pixabay.com/photo/2016/02/10/15/43/cocktail-1191924__340.jpg",
            [new Ingredient("dough", 1), new Ingredient("cheese", 1)]
        ),
        new Recipe(
            "Pasta", 
            "It is a long established fact", 
            "https://cdn.pixabay.com/photo/2015/07/02/19/56/pisco-sour-829477__340.jpg",
            [new Ingredient("pasta", 1), new Ingredient("sauce", 1)]
        )
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}