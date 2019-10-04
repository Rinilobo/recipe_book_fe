// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-shopping-edit',
//   templateUrl: './shopping-edit.component.html',
//   styleUrls: ['./shopping-edit.component.css']
// })
// export class ShoppingEditComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { NgForm } from '@angular/forms';
import { ShoppinglistService } from './../../services/shoppinglist.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})


export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  name: string;

  @ViewChild('f', {static: false}) slForm: NgForm

  constructor(public shoppinglistService: ShoppinglistService) { }

  ngOnInit() {
    this.subscription = this.shoppinglistService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppinglistService.getIngredient(index);

      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    })
  }

  addIngredients(item: NgForm) {
    const name = item.value.name;
    const amount = item.value.amount;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppinglistService.editIngredient(this.editedItemIndex, newIngredient);
      //this.editMode = false;
    } else {
      this.shoppinglistService.addIngredients(newIngredient)
    }
    this.onClear();
  }

  onClear() {
    console.log('i am here clear ')
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppinglistService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
