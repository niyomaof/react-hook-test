import * as axios from "axios";

const server = require('./server.config')

export const findAllUser = async () => {
  const respone = await axios.get(server.API_URL + '/user')
  return respone.data
}

export const addUser = async (user) => {
  const respone = await axios.post(server.API_URL + '/user', user)
  return respone.data
}

export const deleteUser = async (id) => {
  const respone = await axios.delete(server.API_URL + '/user/' + id)
  return respone.data
}

export const editUser = async (user) => {
  console.log('user', user, 'user')
  const respone = await axios.put(server.API_URL + '/user/' + user.id, {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    password: user.password
  })
  return respone.data
}