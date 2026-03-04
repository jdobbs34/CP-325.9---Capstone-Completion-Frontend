import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
     <span>📚 BookTracker</span>
      <div>
        <NavLink to='/'>My Books</NavLink>
        <NavLink to='/add'>+ Add Book</NavLink>
        <NavLink to='/stats'>Stats</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
