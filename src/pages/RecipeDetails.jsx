import React, { useContext } from "react";
import { RecipesContext } from "../App";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

export default function RecipeDetails() {
  const { recipes } = useContext(RecipesContext);

  const params = useParams();

  const drink = recipes.find((recipe) => {
    return recipe.id === parseInt(params.id);
  });
  console.log(drink);

  return <div>{drink ? <RecipeCard recipe={drink} /> : "Drink Not Found"}</div>;
}
