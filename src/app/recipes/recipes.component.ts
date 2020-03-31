import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeService]
})
export class RecipesComponent implements OnInit {

  recipeSelectedToDisplay: Recipe;

  constructor(private recipeServ: RecipeService) { }

  ngOnInit() {
    this.recipeServ.recipeSelected.subscribe(
      (recipe:Recipe) => {
        this.recipeSelectedToDisplay = recipe;
      }
    );
  }

}
