import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service'
import { ShoppinglistService} from '../../services/shoppinglist.service'
import { delay } from 'q';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id: number;
  recipe: Recipe;
  constructor(public route: ActivatedRoute, public recipeService: RecipeService, public router: Router, public shoppingListService: ShoppinglistService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getRecipeById1();
    });

  }
  getRecipeById1() {
    this.recipeService.getRecipeById(this.id).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe[0];
      });
  }

  // delete a recipe
  async onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id).subscribe((resp) => {
       this.router.navigate(['/recipes']);
    })
  }

  
  //add ingredients to shopping list
  addToShoppingList() {
    console.log(this.recipe.description.ingredients);
    if(this.recipe.description.ingredients) {
     this.recipe.description.ingredients.forEach(element => {
       console.log('element',element);
       this.shoppingListService.addIngredients(element)
     });
    }
    }
  }

