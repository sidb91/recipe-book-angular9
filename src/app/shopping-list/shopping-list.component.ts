import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingServ: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingServ.getIngredients();
    this.subscription = this.shoppingServ.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients; 
      }
    )
  }

  onEditItem(index: number){
    this.shoppingServ.startedEditing.next(index);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
