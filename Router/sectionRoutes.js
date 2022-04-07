const express = require('express');
const sectionsController = require('./../controllers/sectionController');
const authController = require('./../controllers/authController');


const router = express.Router();

router.get('/', sectionsController.getAllSection);
router.post('/', authController.protect, authController.restrictTo('admin'), sectionsController.createSection);
router.patch('/:id', authController.protect, authController.restrictTo('admin'), sectionsController.updateSection);
router.delete('/:id', authController.protect, authController.restrictTo('admin'), sectionsController.deleteSection);





module.exports = router;