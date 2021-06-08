import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../StateProvider'
import CartItem from '../CartItem/CartItem'
import './Payment.css'
import { Link } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../../reducer'
import axios from 'axios'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue()
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState(true)

  useEffect(() => {
    //generate stripe auth to charge
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      })
    }

    getClientSecret()
  }, [basket])

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    //const payload = await stripe
  }

  const handleChange = (event) => {
    //listen for typed changes in the card element and display errors as the cust types the card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} Items</Link>)
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>123 React Dr.</p>
            <p>Dover, NH 03820</p>
          </div>
        </div>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review Items and Devilery Info</h3>
          </div>
          <div className="payment-items">
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
      </div>
      {/* Payment Method */}
      <div className="payment-section">
        <div className="payment-title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment-details">
          {/* Stripe Payment Logic */}
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment-priceContainer">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3>Order Total {value}</h3>
                  </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Procesing</p> : 'Buy Now'}</span>
              </button>
            </div>
            {/* Errors */}
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Payment
