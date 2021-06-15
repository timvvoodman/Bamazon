import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://us-central1-b-15da6.cloudfunctions.net/api', // The API (cloud function) url

  //local host version:  'http://localhost:5001/b-15da6/us-central1/api'
})

export default instance
