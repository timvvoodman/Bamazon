import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (e) => {
    e.preventDefault()
    //Firebase Login Logic
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/')
      })
      .catch((error) => alert(error.message))
  }

  const registerAccount = (e) => {
    e.preventDefault()

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth)
        if (auth) {
          history.push('/')
        }
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login-container">
        <h1>Sign In</h1>
        <form>
          <h5>Email:</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password:</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-signIn-btn" onClick={signIn}>
            Sign in
          </button>
        </form>

        <p>
          By signing in you agree to The Amazon Fake Clone Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice
        </p>

        <button
          type="submit"
          className="login-register-btn"
          onClick={registerAccount}
        >
          Create a New Account
        </button>
      </div>
    </div>
  )
}

export default Login
