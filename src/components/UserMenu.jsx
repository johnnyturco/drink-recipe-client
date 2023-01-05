import { useContext } from "react"
import { UserContext } from "../App"
import {Link} from "react-router-dom"


export default function UserMenu() {

  const {users, setUsers, currentUser, setCurrentUser} = useContext(UserContext)

  function handleUserChange(event) {
    setCurrentUser(parseInt(event.target.value, 10))
  }

  return (
    <div className="user-bar">
      <Link to="/newuser">New User</Link>
      <select onChange={handleUserChange} value={currentUser}>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  )
}