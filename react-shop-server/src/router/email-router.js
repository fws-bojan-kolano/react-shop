const express = require('express');
const { emailController } = require('../controllers/email-controller');
const emailRouter = express.Router();

emailRouter
    .post('/checkout-email', emailController.checkoutEmailControllerPost)
    .post('/change-password-email', emailController.changePasswordEmailControllerPost)
    .post('/remove-user-email', emailController.removeUserEmailControllerPost);

module.exports = {
    emailRouter
};