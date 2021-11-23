import axios from 'axios'
const baseUrl = '/api/login'

const login = (credentials) => {
  const request = axios.post(baseUrl, credentials)
  return request.then(response => response.data)
}

const services = { login }
export default services