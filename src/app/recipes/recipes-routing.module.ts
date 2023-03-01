import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { MessagePageComponent } from "./message-page/message-page.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes = [
    {path:"", 
        component: RecipesComponent,
        children:[
        {path:"", component: MessagePageComponent},
        {path:"new", component: RecipeEditComponent},
        {path:":id", component: RecipeDetailComponent, resolve:[RecipeResolver]},
        {path:":id/edit", component: RecipeEditComponent, resolve:[RecipeResolver]}
        ],
        canActivate:[AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}