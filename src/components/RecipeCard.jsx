import React from 'react'

export default function RecipeCard({recipe}) {
  return (
    <section className="recipe-card">
      <h1>{recipe.drink_name}</h1>
      <h2>Ingredients</h2>
      <ul>{recipe.ingredients.split("\n").map(ingredient => (
        <li key={ingredient}>{ingredient}</li>))}</ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
      <p>Rating: {recipe.rating}/10</p>
      <p>{recipe.made ? "Made ✅" : "Not Made ❌"}</p>
    </section>
  )
}