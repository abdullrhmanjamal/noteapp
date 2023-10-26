import React, { useContext } from 'react'
import logo from '../../images/freshcart-logo.svg'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'
import { CartCountContext } from '../../Context/CartContext'



export default function Navbar() {
  let {cartCount}= useContext(CartCountContext)
  let navigate = useNavigate()
  let { token, setToken } = useContext(authContext)
  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')

  }

  return (
    <>

      <header>
        <nav className="navbar fixed-top  navbar-expand-lg navbar-light bg-main-light mask-custom shadow-0">
          <div className="container">
            <NavLink className="navbar-brand" href="#!"><img src={logo} alt="" /></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto">
                {token ? <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/home">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/cart">Cart</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/products">Products</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/categories">Categories</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/brands">Brands</NavLink>
                  </li>
                </> : null}

              </ul>

              <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item me-3 me-lg-0 position-relative ">
                  
                  <NavLink className="nav-link position-relative" to="/cart">
                   <i className="fas fa-shopping-cart fa-2xl"></i>
                   <span className=' position-absolute top-0 end-0 bg-main cartTest' >{cartCount}</span>
                  </NavLink>
                </li>
                
                {!token ? <>


                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/regster">Register</NavLink>
                  </li>
                </> : <li className="nav-item ">
                  <NavLink className="nav-link" onClick={logout} to="/login">Log Out</NavLink>
                </li>}


              </ul>
            </div>
          </div>
        </nav>
    
      </header>


    </>
  )
}
