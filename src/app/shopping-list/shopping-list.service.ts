import { Ingredient } from "../shared/ingredients.model";
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apple", "5 pieces"),
    new Ingredient("Orange", "10 pieces")
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  onIngredientAdd(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
