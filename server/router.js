const express = require('express');
const controllers = require('./controllers.js');
const router = express.Router();

router.get('/liveusers/list', controllers.getLiveUsers);
router.post('/liveusers/user', controllers.updateUser);

module.exports = router;