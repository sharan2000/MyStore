import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient("Apple", 20),
    new Ingredient("Carrot", 5),
    new Ingredient("Potatos", 10)
  ];

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
  }
}
