import React, { useState, useContext, useEffect } from "react";
import { RecipesContext } from "../App";
import { useParams, useHistory } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

const defaultFormData = {
  drink_name: "",
  ingredients: "",
  instructions: "",
  rating: 0,
  made: false,
  image_url: "",
};

export default function EditRecipe() {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const params = useParams();
  const history = useHistory();

  const drink = recipes.find((recipe) => {
    return recipe.id === parseInt(params.id);
  });

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (drink) {
      setFormData(drink);
    }
  }, [drink, recipes]);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleEditDrink(updatedDrink) {
    setRecipes((prevRecipes) => {
      const found = prevRecipes.findIndex(
        (recipe) => recipe.id === updatedDrink.id
      );
      prevRecipes.splice(found, 1, updatedDrink);
      return prevRecipes;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:9292/drinks/${drink.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((updatedDrink) => {
        handleEditDrink(updatedDrink);
        history.push(`/details/${updatedDrink.id}`);
      });
  }

  return (
    <div className="edit-drink-form">
      <h1>Edit Drink</h1>
      {drink ? (
        <RecipeForm
          recipe={formData}
          submitButton="Save"
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        "Loading…"
      )}
    </div>
  );
}
