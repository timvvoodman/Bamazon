import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import './components/Header/Header'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Checkout from './components/Checkout/Checkout'
import Login from './components/Login/Login'
import Payment from './components/Payment/Payment'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe(
  'pk_test_51IxYT7HZRErQtFT67GXEnIJT6wt9onj1YERXwDDKMFKUz4SXHRbajdPNm5oYcRclSrnRnW1k8BCSeVsdByPrfSGn00ASVSsg1j'
)

function App() {
  const [{}, dispatch] = useStateValue()
  //Track logged in user
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('the user is', authUser)

      if (authUser) {
        //user just logged in or / was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
