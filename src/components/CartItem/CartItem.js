import React from 'react'
import { useStateValue } from '../../StateProvider'
import './CartItem.css'

function CartItem({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValue()

  const removeFromBasket = () => {
    //remove item from the cart
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: id,
    })
  }
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct-image" src={image} alt={title} />
      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>
        <p>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>Remove from cart</button>
      </div>
    </div>
  )
}

export default CartItem
