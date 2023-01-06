import React from "react";
import { useContext, useState } from "react";
import { RecipesContext, UserContext } from "../App";
import { useHistory } from "react-router-dom";

export default function AddRecipe() {
  const { currentUser } = useContext(UserContext);
  const { setRecipes } = useContext(RecipesContext);
  const history = useHistory();

  const defaultFormData = {
    drink_name: "",
    ingredients: "",
    instructions: "",
    rating: 0,
    made: false,
    image_url: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [toDetailsPage, setToDetailsPage] = useState(false);

  // if (toDetailsPage === true) {
  //   return <Redirect to="/" />;
  // }

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleAddDrink(newDrink) {
    setRecipes((prevRecipes) => {
      return [...prevRecipes, newDrink];
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:9292/drinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, user_id: currentUser }),
    })
      .then((r) => r.json())
      .then((newDrink) => {
        handleAddDrink(newDrink);
        console.log(newDrink);
        history.push(`/details/${newDrink.id}`);
      });
  }

  return (
    <div className="add-drink-form">
      <h1>Add Drink</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="drink_name"
          placeholder="Drink Name"
          value={formData.drink_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="ingredients"
          placerholder="Ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        /> */}
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />
        <button type="submit">Add Drink</button>
      </form>
    </div>
  );
}
