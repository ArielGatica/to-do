const express = require('express');
const ApiRoutes = express.Router();
const { getUsers, saveUsers, removeUsers} = require('../controllers/users.controllers');

ApiRoutes.route('/').get(getUsers);
ApiRoutes.route('/save').post(saveUsers);
ApiRoutes.route('/delete/:_id').delete(removeUsers);

module.exports = ApiRoutes