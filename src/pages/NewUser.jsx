import React, { useState } from "react"
import {Redirect} from "react-router-dom"

export default function NewUser({onNewUserSubmit}) {

  const defaultFormData = {
    name: "",
    email: ""
  }

  const [formData, setFormData] = useState(defaultFormData)
  const [toHomePage, setToHomePage] = useState(false)

  if(toHomePage === true) {
    return <Redirect to="/" />
  }

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

    fetch('http://localhost:9292/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(newUser => {
        onNewUserSubmit(newUser)
        setToHomePage(true)
      })
  }

  return (
    <div className="new-user-form">
      <h1>New User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placerholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placerholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  )
}