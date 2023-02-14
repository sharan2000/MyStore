import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes : Recipe[] = [
    new Recipe("test name 1", "It is a long established fact", "https://cdn.pixabay.com/photo/2013/06/09/06/07/meat-123668__340.jpg"),
    new Recipe("test name 2", "It is a long established fact", "https://cdn.pixabay.com/photo/2016/02/10/15/43/cocktail-1191924__340.jpg"),
    new Recipe("test name 3", "It is a long established fact", "https://cdn.pixabay.com/photo/2015/07/02/19/56/pisco-sour-829477__340.jpg")
  ];
}
