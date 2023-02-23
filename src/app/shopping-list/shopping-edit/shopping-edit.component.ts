import { Component, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild("nameInput", {static:true}) nameRef: ElementRef;
  @ViewChild("amountInput", {static:true}) amountRef : ElementRef;

  constructor(public shoppingListService : ShoppingListService) {}

  onAdd(event: Event) {
    event.preventDefault();
    let inputName = this.nameRef.nativeElement.value;
    let inputAmount = this.amountRef.nativeElement.value;
    this.shoppingListService.addIngredient(new Ingredient(inputName, inputAmount));
  }
}
