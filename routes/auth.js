const express = require('express');

const authController = require('../controllers/auth');
const { check, body } = require('express-validator/check');

const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
        body(
            'email',
            'Your email is incorrect or not exist at all.'
        ).isEmail()
        .normalizeEmail(),

        body('password')
            .isLength({
                min: 6
            })
    ],
    authController.postLogin);

router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please, enter a valid email')
            .custom((value, { req }) => {
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('E-Mail already exists!');
                        }
                    });
            })
            .normalizeEmail(),

        body(
            'password',
            'Please, enter a password at least 6 characters long'
        )
            .isLength({ min: 6 }),

        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords have to match!')
                }
                return true;
            })
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports = router;