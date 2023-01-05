import { useState, createContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";

export const RecipesContext = createContext([]);
export const UserContext = createContext(null);

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/drinks")
      .then((r) => r.json())
      .then((drinksFromServer) => setRecipes(drinksFromServer));
  }, []);

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:9292/users")
      .then((r) => r.json())
      .then((usersFromServer) => {
        setUsers(usersFromServer);
        setCurrentUser(usersFromServer[0].id);
      });
  }, []);

  const userRecipes = recipes.filter((recipe) => {
    return recipe.user_id === currentUser;
  });

  function handleNewUserSubmit(newUser) {
    setUsers((prevUsers) => {
      return [...prevUsers, newUser];
    });
  }

  function handleAddDrink(newDrink) {
    setRecipes((prevRecipes) => {
      return [...prevRecipes, newDrink];
    });
  }

  return (
    <UserContext.Provider
      value={{ users, setUsers, currentUser, setCurrentUser }}
    >
      <RecipesContext.Provider value={{ userRecipes, recipes, setRecipes }}>
        <Switch>
          <Route path="/add">
            {" "}
            <AddRecipe onAddDrink={handleAddDrink} />{" "}
          </Route>
          <Route path="/edit/:id">
            {" "}
            <EditRecipe />{" "}
          </Route>
          <Route path="/details/:id">
            {" "}
            <RecipeDetails />{" "}
          </Route>
          <Route path="/newuser">
            {" "}
            <NewUser onNewUserSubmit={handleNewUserSubmit} />{" "}
          </Route>
          <Route path="/">
            {" "}
            <Home />{" "}
          </Route>
        </Switch>
      </RecipesContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
