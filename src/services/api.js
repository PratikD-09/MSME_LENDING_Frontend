import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const submitBusiness = async (data) => {
  const response = await api.post('/business', data)
  return response.data
}

export const submitLoan = async (data) => {
  const response = await api.post('/loan', data)
  return response.data
}

export const getDecision = async (businessData, loanData) => {
  const response = await api.post('/decision', { ...businessData, ...loanData })
  return response.data

  console.log(response.data);
}


export default api