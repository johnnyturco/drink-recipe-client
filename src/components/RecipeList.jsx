import React, {useContext} from "react"
import {RecipesContext} from "../App"
import RecipeCard from "./RecipeCard"

export default function RecipeList() {

  const recipes = useContext(RecipesContext)

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe}/>
      ))}
    </div>
  )
}