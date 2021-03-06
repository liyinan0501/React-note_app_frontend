import axios from 'axios'
// const baseUrl = 'http://localhost:3001/notes'
// const baseUrl = 'https://yinan-notes-app.herokuapp.com/notes'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const deleteNote = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default { getAll, create, update, deleteNote }

// const getAll = () => {
//   return axios.get(baseUrl)
// }

// const create = (newObject) => {
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }
