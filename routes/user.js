const express = require('express')
const route = express.Router()
const { createUser, getAllUsers, updateUser, deleteUser } = require('../controller/user')


route.post('/create', createUser)

route.get('/read', getAllUsers)

route.put('/update/:id', updateUser)

route.delete('/delete/:id', deleteUser)

module.exports = route;