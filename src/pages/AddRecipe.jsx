import React from 'react'
import { useContext, useState } from "react"
import { UserContext } from "../App"

export default function AddRecipe({onAddDrink}) {

  const {currentUser} = useContext(UserContext)

  const defaultFormData = {
    drink_name: "",
    ingredients: "",
    instructions: "",
    rating: 0,
    made: false,
    image_url: "",
    user_id: currentUser
  }

  const [formData, setFormData] = useState(defaultFormData)

  function handleChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    // console.log(formData)

    fetch('http://localhost:9292/drinks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(newDrink => {
        // onAddDrink(newDrink)
        console.log(newDrink)
      })
  }

  return (
    <div className="add-drink-form">
      <h1>Add Drink</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="drink_name"
          placerholder="Drink Name"
          value={formData.drink_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ingredients"
          placerholder="Ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instructions"
          placerholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placerholder="Rating"
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
          placerholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
        />
        <button type="submit">Add Drink</button>
      </form>
    </div>
  )
}