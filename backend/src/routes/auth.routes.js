const express = require('express');
const authControllers = require('../controller/auth.controller');
// Create Express Router
const router = express.Router();
/*
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', authControllers.registerUser);
/*
 * POST /api/auth/login
 * Login existing user
 */
router.post('/login', authControllers.loginUser);

module.exports = router;