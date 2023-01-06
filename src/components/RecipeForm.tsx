import React from "react";

export default function RecipeForm({recipe, submitButton, handleChange, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="drink_name"
        placeholder="Drink Name"
        value={recipe.drink_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
      />
      <input
        type="text"
        name="instructions"
        placeholder="Instructions"
        value={recipe.instructions}
        onChange={handleChange}
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={recipe.rating}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image_url"
        placeholder="Image URL"
        value={recipe.image_url}
        onChange={handleChange}
      />
      <button type="submit">{submitButton}</button>
    </form>
  );
}
