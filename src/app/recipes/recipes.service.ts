import { Recipe } from "./recipes.model";
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';


export class RecipeService {

recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "Mutton Biriyani",
      "Mutton Biryani is a regal dish straight from the lands of the Nizams. One of the popular methods of preparing this biryani recipe is Pakki Dum Mutton Biryani in which the mutton and rice, are cooked separately and then steamed until the biryani is cooked completely in layers.",
      "assets/images/muttonBiriyani.jpg",
      [new Ingredient("Mutton","1 kg"), new Ingredient("Rice","1 kg"), new Ingredient("Potato","2 pieces")]
    ),
    new Recipe(
      "Aloo posto",
      "Poppy seed paste and potato pieces cooked together with mustard oil and dry black chillis",
      "assets/images/alooPosto.jpg",
      [new Ingredient("Potato","7 pieces"), new Ingredient("Poppy Seed","50 grams"),
       new Ingredient("Mustard Oil","4 tablespoon"), new Ingredient("Salt","2 teasespoon"),
       new Ingredient("Sugar","1 and half teasespoon"), new Ingredient("Green chilli","5 pieces"),
       new Ingredient("Black cumin","Half teasespoon"), new Ingredient("Onions","2 sliced onions")]
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
