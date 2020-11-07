const express = require('express');
const ApiRoutes = express.Router();
const { getTasks, saveTask, doneTask } = require('../controllers/tasks.controllers');

ApiRoutes.route('/').get(getTasks);
ApiRoutes.route('/save').post(saveTask);
ApiRoutes.route('/done/:_id').patch(doneTask);

module.exports = ApiRoutes;
