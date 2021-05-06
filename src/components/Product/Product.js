import React from 'react'
import { useStateValue } from '../../StateProvider'
import './Product.css'

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue()

  const addToBasket = () => {
    //dispatch the item into the basket state
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    })
  }

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt={title} />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product
