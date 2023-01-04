import {useState, useEffect} from "react"
import {Link} from "react-router-dom"


export default function UserMenu() {

  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
    fetch('http://localhost:9292/users')
      .then(r => r.json())
      .then(usersFromServer => {setUsers(usersFromServer)
      setCurrentUser(usersFromServer[0].id)})
  }, [])

  function handleUserChange(event) {
    setCurrentUser(event.target.value)
  }

  return (
    <div>
      <Link to="/newuser">New User</Link>
      <select onChange={handleUserChange} value={currentUser}>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  )
}