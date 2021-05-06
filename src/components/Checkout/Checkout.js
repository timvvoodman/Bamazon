import React from 'react'
import './Checkout.css'
import Subtotal from '../Subtotal/Subtotal'
import CartItem from '../CartItem/CartItem'
import { useStateValue } from '../../StateProvider'

function Checkout() {
  //Get Basket from State
  const [{ basket, user }, dispatch] = useStateValue()
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB42349668_.jpg"
          alt="advertisement"
          className="checkout-ad"
        />
        <div>
          <h3>Hello, {!user ? 'Guest' : user.email}</h3>
          <h2 className="checkout-title">Your Cart</h2>
          {basket.map((item) => (
            <CartItem
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal />

        {/* Subtotal */}
      </div>
    </div>
  )
}

export default Checkout
