import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service'
import { Recipe } from '../recipes/recipe.model';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  constructor( public recipeService: RecipeService ,  public route: ActivatedRoute, public router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
   
  ngOnInit() {
    this.getAllRecipes(); 
  }
   public getAllRecipes() {
    this.recipeService.getRecipes().subscribe((recipes : Recipe [])=> { 
          this.recipes = recipes;
      });
  }
}

