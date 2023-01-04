import {useState, createContext, useEffect} from 'react'
import {Route, Switch} from "react-router-dom"
import './App.css'
import AddRecipe from './pages/AddRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'
import Home from './pages/Home'

export const RecipesContext = createContext([])

function App() {
  // const [recipes, setRecipes] = useState([])
  const recipesState = useState([])
  const [recipes, setRecipes] = recipesState;

  useEffect(() => {
    fetch('http://localhost:9292/drinks')
      .then(r => r.json())
      .then(drinksFromServer => setRecipes(drinksFromServer))
  }, [])

  return (
    <RecipesContext.Provider value={recipes}>
      <Switch>
        <Route path="/add"> <AddRecipe /> </Route>
        <Route path="/edit/:id"> <EditRecipe /> </Route>
        <Route path="/details/:id"> <RecipeDetails /> </Route>
        <Route path="/"> <Home /> </Route>
      </Switch>
    </RecipesContext.Provider>
  )
}

export default App
