import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
          <ul>
              <li>
                  <Link to="/" className='link'>Home</Link>
              </li>
              <li>
                  <Link to="/about" className='link'>About</Link>
              </li>
          </ul>  
    </nav>
  )
}
