import { Component, OnInit } from '@angular/core';
import { ShoppinglistService } from './../services/shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(public shoppingListService: ShoppinglistService) { }
  ngOnInit() {
  }

  editItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

}
