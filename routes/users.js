const express = require('express');
const verifyToken = require("../middleware/auth");

const router = express.Router();

const {
    getUser,
    register,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers, 
    getUserByEmail
  } = require('../controllers/users');

  router.route('/')
  .get(verifyToken, getAllUsers)
  .post(createUser);

  router.route('/:id')
  .get(verifyToken, getUser)
  .put(verifyToken, updateUser) 
  .delete(verifyToken, deleteUser);

  router.route('/email/:email')
  .get(verifyToken, getUserByEmail);

  router.route('/register')
  .post(register);

  module.exports = router;