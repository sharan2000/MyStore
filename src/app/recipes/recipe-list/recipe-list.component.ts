import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes:Recipe[];
  subscription : Subscription;
  constructor(public recipeService: RecipeService, public router: Router, public currentRoute: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesModified.subscribe({
      next : (modRecipes) => {
        this.recipes = modRecipes;
      }
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo:this.currentRoute});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
