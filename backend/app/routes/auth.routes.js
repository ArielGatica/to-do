const express = require('express');
const ApiRoutes = express.Router();
const { signIn } = require('../controllers/auth.controllers');

ApiRoutes.route('/signin').post(signIn);

module.exports = ApiRoutes;