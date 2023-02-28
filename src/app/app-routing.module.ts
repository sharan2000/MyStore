import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MessagePageComponent } from './recipes/message-page/message-page.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:"", redirectTo:"/recipes", pathMatch:"full"},
  {path:"recipes", 
    component: RecipesComponent,
    children:[
      {path:"", component: MessagePageComponent},
      {path:"new", component: RecipeEditComponent},
      {path:":id", component: RecipeDetailComponent, resolve:[RecipeResolver]},
      {path:":id/edit", component: RecipeEditComponent, resolve:[RecipeResolver]}
    ],
    canActivate:[AuthGuard]
  },
  {path:"shopping-list", component: ShoppingListComponent},
  {path:'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
