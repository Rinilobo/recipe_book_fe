import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Recipe } from '../recipes/recipe.model'
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RecipeService {
    recipe: Recipe[] = [];
    constructor(private httpClient: HttpClient) {

    }
    getRecipes(): Observable<Object> {
        return this.httpClient.get<Recipe[]>('http://localhost:3000/users');
    }

    getRecipeById(id: number): Observable<Object> {
        return this.httpClient.get<Recipe[]>('http://localhost:3000/users/' + id);
    }
    createRecipe(recipe: Recipe): Observable<Recipe> {
        console.log('@@@@@@@@', recipe);
        return this.httpClient.post<Recipe>('http://localhost:3000/users', recipe);
    }
    deleteRecipe(id: number): Observable<Object> {
        console.log('recipe delete')
        return this.httpClient.delete<Recipe>('http://localhost:3000/users/' + id)
    }

    updateRecipe(id: number, recipe: Recipe){
        return this.httpClient.put('http://localhost:3000/users/' + id, recipe)
         
    }
    errorHandler(error: any): void {
        console.log(error)
    }
}