// import { Ingredient } from './../shared/ingredient.model';
/**
 * Recipe blueprint
 */
export class Recipe {
//   public id : number;
  public description : object;

//   public name: string;
//   public description: string;
//   public imagePath: string;
//   public ingredients: Ingredient[];

  constructor(description: object) {
    // this.id = id;
    this.description = description;
    // this.imagePath = imagePath;
    // this.ingredients = ingredients;
  }
}
