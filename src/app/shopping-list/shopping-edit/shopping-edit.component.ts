import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild("nameInput", {static:true}) nameRef: ElementRef;
  @ViewChild("amountInput", {static:true}) amountRef : ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAdd(event: Event) {
    event.preventDefault();
    this.ingredientAdded.emit(new Ingredient(this.nameRef.nativeElement.value,this.amountRef.nativeElement.value));
  }
}
