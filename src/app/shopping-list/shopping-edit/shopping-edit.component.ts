import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput',{static:false}) nameInputRef: ElementRef;
  @ViewChild('amountInput',{static:false}) amountInputRef: ElementRef;

  constructor(private shoppingServ: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(){
    const ingreName = this.nameInputRef.nativeElement.value;
    const ingreAmount = this.amountInputRef.nativeElement.value;
    const newIngredient =  new Ingredient(ingreName, ingreAmount);
    this.shoppingServ.onIngredientAdd(newIngredient);
  }

}
