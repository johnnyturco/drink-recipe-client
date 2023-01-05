import React, { useContext } from "react";
import { RecipesContext } from "../App";

export default function RecipeCard({ recipe }) {
  const { setRecipes } = useContext(RecipesContext);

  function handleDelete() {
    fetch(`http://localhost:9292/drinks/${recipe.id}`, {
      // need to finish RecipeContext to define id
      method: "DELETE",
    });

    setRecipes((recipes) => recipes.filter((r) => r.id !== recipe.id));
  }

  return (
    <section className="recipe-card">
      <h1>{recipe.drink_name}</h1>

      <div>
        <div>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.split("\n").map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <img className="drink-image" src={recipe.image_url} />
        </div>
      </div>

      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>

      <p>Rating: {recipe.rating}/10</p>

      <p>{recipe.made ? "Made ✅" : "Not Made ❌"}</p>
      <div>
        <button onClick={handleDelete}>Remove</button>
        <button>Edit</button>
      </div>
    </section>
  );
}
