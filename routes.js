const express = require('express');
const router = express.Router();
const userController = require('./controllers/usercontroller');
const campaignController = require('./controllers/campaigncontroller');
const commentController = require('./controllers/commentcontroller');
const validateSession = require('./middleware/validateSession');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

// router.get('/campaigns/:id', campaignController.getCampaign);
router.get('/campaigns', campaignController.getCampaigns);
router.post('/createcampaign',  userController.allowIfLoggedin, userController.grantAccess('createOwn', 'campaign'), campaignController.createCampaign);
router.put('/campaigns/:id',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'campaign'), campaignController.editCampaign);
router.delete('/campaigns/:id',  userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'campaign'), campaignController.deleteCampaign);

// router.get('/comments', commentController.getComments);
// router.post('/createcomment',  userController.allowIfLoggedin, userController.grantAccess('createOwn', 'comment'), commentController.createComment);
// router.put('/comments/:id',  userController.allowIfLoggedin, userController.grantAccess('updateAny', 'comment'), commentController.editComment);
// router.delete('/comments/:id',  userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'comment'), commentController.deleteComment);
 
module.exports = router;