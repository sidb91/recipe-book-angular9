import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Mutton Biriyani',
      'Mutton Biryani is a regal dish straight from the lands of the Nizams. One of the popular methods of preparing this biryani recipe is Pakki Dum Mutton Biryani in which the mutton and rice, are cooked separately and then steamed until the biryani is cooked completely in layers.',
      'assets/images/muttonBiriyani.jpg',
      [
        new Ingredient('Mutton', '1 kg'),
        new Ingredient('Rice', '1 kg'),
        new Ingredient('Potato', '2 pieces'),
      ]
    ),
    new Recipe(
      'Aloo posto',
      'Poppy seed paste and potato pieces cooked together with mustard oil and dry black chillis',
      'assets/images/alooPosto.jpg',
      [
        new Ingredient('Potato', '7 pieces'),
        new Ingredient('Poppy Seed', '50 grams'),
        new Ingredient('Mustard Oil', '4 tablespoon'),
        new Ingredient('Salt', '2 teasespoon'),
        new Ingredient('Sugar', '1 and half teasespoon'),
        new Ingredient('Green chilli', '5 pieces'),
        new Ingredient('Black cumin', 'Half teasespoon'),
        new Ingredient('Onions', '2 sliced onions'),
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
