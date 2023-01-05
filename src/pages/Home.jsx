import React from 'react'
import RecipeList from "../components/RecipeList"
import UserMenu from "../components/UserMenu"
import {Link} from "react-router-dom"

export default function Home() {



  return (
    <>
      <Link to="/add">Add Drink</Link>
      <UserMenu />
      <RecipeList />
    </>
  )
}