const express = require('express');
const authControllers = require('../controller/auth.controller');
const router = express.Router();

router.post('/register', authControllers.registerUser);

module.exports = router;