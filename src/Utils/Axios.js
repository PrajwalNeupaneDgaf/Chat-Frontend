import axios from 'axios'

const token = localStorage.getItem('token') || ''

const axiosFetch = axios.create({
    baseURL: 'https://chat-backend-6m3t.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
})

export default axiosFetch