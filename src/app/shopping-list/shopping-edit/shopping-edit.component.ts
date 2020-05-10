import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f',{ static: false }) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedIngredient: Ingredient;

  constructor(private shoppingServ: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingServ.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedIngredient = this.shoppingServ.getIngredient(index);
        this.slForm.setValue({ 
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
         })
      }
    );
    
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient =  new Ingredient(value.name, value.amount);

    if(this.editMode){
      this.shoppingServ.updateIngredients(this.editedItemIndex,newIngredient);
    }else{
      this.shoppingServ.onIngredientAdd(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  resetForm(){
    this.slForm.reset();
    this.editMode = false;
  }

  deleteItem(){
    this.resetForm();
    this.shoppingServ.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
