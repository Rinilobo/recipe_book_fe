import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe[] = [];
  editMode: boolean = false;
  id: number;
  newForm: boolean = false;
  imagePath: string;
  recipeEditForm;
  @Output() valueUpdate = new EventEmitter(); 
  constructor(public route: ActivatedRoute, public router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.newForm = params['id'] === undefined;
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  updateValue(recipe) {  
    this.valueUpdate.emit(recipe);  
  }  

  initForm() {
    var name = "";
    var imagePath = "";
    let recipeItem;
    var description = "";
    var ingredients = new FormArray([]);

    // Form set up Reactive
    this.recipeEditForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    })

    if (this.editMode) {
      this.recipeService.getRecipeById(this.id).subscribe((recipe: Recipe) => {
        recipeItem = recipe[0].description;
        if (recipeItem['ingredients']) {
          for (let ingredient of recipeItem.ingredients) {
            ingredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            )
          }
        }
        this.recipeEditForm = new FormGroup({
          'name': new FormControl(recipeItem.name, Validators.required),
          'imagePath': new FormControl(recipeItem.imageUrl, Validators.required),
          'description': new FormControl(recipeItem.description, Validators.required),
          'ingredients': ingredients
        })
      });
    }
  }
  onCancel() {
    this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    this.editMode = true;
    (<FormArray>this.recipeEditForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onSubmit() {
    let addRecipe = {};
    var updatedRecipe;
    addRecipe['name'] = this.recipeEditForm.value['name'];
    addRecipe['imageUrl'] = this.recipeEditForm.value['imagePath'];
    addRecipe['description'] = this.recipeEditForm.value['description'];
    addRecipe['ingredients'] = this.recipeEditForm.value['ingredients'];
    const newRecipe = new Recipe(addRecipe);
    if (!this.newForm) {
      this.recipeService.updateRecipe(this.id, newRecipe).subscribe(
        (success) => {
          this.updateValue(newRecipe);
          this.router.navigate(['/recipes', this.id]);
        },
        (err)=>{
          console.log('Error while updating the recipe', err);
        }
      );
    } else {
      this.recipeService.createRecipe(newRecipe).subscribe(recipe => {
        this.updateValue(newRecipe);
        console.log('Recipe is successfully created.')
      });
      this.router.navigate(['/recipes']);
    }
  };

  deleteIngredient(index: number) {
    (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
  }

}
