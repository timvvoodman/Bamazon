import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { useStateValue } from '../../StateProvider'
import { auth } from '../../firebase'

function Header() {
  const [{ basket, user }, dispatch] = useStateValue()

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut()
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        ></img>
      </Link>
      <div className="header-search">
        <input className="header-searchIn"></input>
        {/* Search logo */}
        <SearchIcon className="header-search-icon" />
      </div>
      <div className="header-nav">
        <Link to={!user && '/login'}>
          <div className="header-option" onClick={handleAuthenticaton}>
            <span className="header-optionLine1">
              Hello {!user ? 'Guest' : user.email}
            </span>
            <span className="header-optionLine2">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <Link to={'/orders'}>
          <div className="header-option">
            <span className="header-optionLine1">Returns</span>
            <span className="header-optionLine2">& Orders</span>
          </div>
        </Link>
        <div className="header-option">
          <span className="header-optionLine1">Your</span>
          <span className="header-optionLine2">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header-basket">
            <ShoppingBasketIcon />
            <span className="header-optionLine2 header-basket-count">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
