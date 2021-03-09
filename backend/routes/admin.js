const express = require('express');

const AdminUserController = require('../controllers/admin');

const router = express.Router();

router.post('/signup', AdminUserController.createAdminUser);

router.post('/login', AdminUserController.adminUserLogin);

router.get('/users', AdminUserController.getUsers);

module.exports = router;
