import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingAddedSubscription: Subscription;

  constructor(public shoppingListService : ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingAddedSubscription = this.shoppingListService.ingredientAdded.subscribe({
      next : (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    });
  }

  ngOnDestroy(): void {
    this.ingAddedSubscription.unsubscribe();
  }

  onEdit(ind: number) {
    this.shoppingListService.startedEditing.next(ind);
  }
}
