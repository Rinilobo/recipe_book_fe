// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ShoppinglistService {

//   constructor() { }
// }

import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable()
export class ShoppinglistService {
  amountInput: any;
  nameInput: any;
  startedEditing = new Subject<number>();


  public ingredients: Ingredient[] = [
    new Ingredient('Test Ingredient', 10),

  ];


  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  editIngredient(index: number, item: Ingredient) {
    this.ingredients[index] = item;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
  }


}
