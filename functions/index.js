const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
  'sk_test_51IxYT7HZRErQtFT6Oz2Fw2eoVsgxBHxpRHY9fS1T0r7ZZlDLBarG7Fp0fxnp88oykeMsZ2ecMenIfC2AdEjqbc7L009BGdUIsa'
)
////API SETUP////

//App Config
const app = express()

//Middleware
app.use(cors({ origin: true }))
app.use(express.json())

//API Routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
  const total = request.query.total
  console.log('Payment request received for', total)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  })

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

//Listen command
exports.api = functions.https.onRequest(app)

//test endpoint
//http://localhost:5001/b-15da6/us-central1/api
