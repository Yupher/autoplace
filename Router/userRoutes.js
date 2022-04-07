const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');


const router = express.Router();

// Auth Controller 
router.post('/signup', authController.signup);
router.post('/signup/phone', authController.signupPhone);
router.post('/login', authController.login);
router.post('/google/login', authController.googleLogin);
router.post('/facebook/login', authController.facebookLogin);
router.get('/logout', authController.logout);
router.post('/loaduser', authController.loadUser);

// User Controller 
router.post('/resendEmail',
    authController.protect,
    authController.resendEmail);

router.post('/confirmEmail',
    authController.protect,
    authController.confirmEmail);

router.post('/resendPhone',
    authController.protect,
    authController.resendPhone);

router.post('/confirmPhone',
    authController.protect,
    authController.confirmPhone);


// User Controller 
router.post('/',
    authController.protect,
    authController.isAdmin,
    userController.getAllUsers);

router.post('/add/admin',
    authController.protect,
    authController.isMainAdmin,
    userController.addAdmin);

router.post('/delete/admin',
    authController.protect,
    authController.isMainAdmin,
    userController.deleteAdmin);

router.post('/block/one',
    authController.protect,
    authController.isAdmin,
    userController.blockUser);


router.post('/update/me',
    authController.protect,
    userController.updateMe);

router.post('/update/password',
    authController.protect,
    userController.updatePassword);


module.exports = router;