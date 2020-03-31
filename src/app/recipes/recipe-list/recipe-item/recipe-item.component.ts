import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  

  constructor(private recipeServ: RecipeService) { }

  ngOnInit() {
  }

  onRecipeSelect(){
    this.recipeServ.recipeSelected.emit(this.recipe) ;
  }

}
