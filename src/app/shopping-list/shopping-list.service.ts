import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class ShoppingListService {
    ingredientAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient("Apple", 20),
        new Ingredient("Carrot", 5),
        new Ingredient("Potatos", 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngerdient(ind : number) {
        return this.ingredients[ind];
    }

    updateIngredient(ind : number, ingredient : Ingredient) {
        this.ingredients[ind] = ingredient;
        this.ingredientAdded.next(this.ingredients.slice());
    }

    deleteIngredient(ind : number) {
        this.ingredients.splice(ind, 1);
        this.ingredientAdded.next(this.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientAdded.next(this.ingredients.slice());
    }
}