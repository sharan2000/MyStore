import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;

  id: number;
  editMode = false

  constructor(public router : Router, public currentRoute : ActivatedRoute, public recipeService: RecipeService) {}

  ngOnInit() {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = [];

    if(this.editMode) {
      let recipe: Recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;

      if(recipe.ingredients.length) {
        for(let ingredient of recipe.ingredients) {
          let ingredientFormGroup = new FormGroup({
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount' : new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
          });
          recipeIngredients.push(ingredientFormGroup);
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : new FormArray(recipeIngredients)
    });
  }

  getIngredientGroups() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    }));
  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.currentRoute });
  }

  onDeleteControl(ind : number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ind);
  }
}
