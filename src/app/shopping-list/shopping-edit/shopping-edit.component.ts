import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingForm') ingredientForm : NgForm;

  subscription : Subscription;
  editMode = false;
  editItemIndex: number;
  editIngredientItem : Ingredient;

  constructor(public shoppingListService : ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe({
      next : (ind: number) => {
        this.editMode = true;
        this.editItemIndex = ind;
        this.editIngredientItem = this.shoppingListService.getIngerdient(ind);
        this.ingredientForm.setValue({
          'name' : this.editIngredientItem.name,
          'amount' : this.editIngredientItem.amount,
        });
      }
    });
  }

  onClear() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    let inputName = this.ingredientForm.value['name'];
    let inputAmount = this.ingredientForm.form.value['amount'];
    let newIng = new Ingredient(inputName, inputAmount);

    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, newIng);
    } else {
      this.shoppingListService.addIngredient(newIng);
    }
    this.onClear();
  }
}
