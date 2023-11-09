const express=require('express');
const router=express.Router();

const contactCustomLabelController =require('../controllers/contactCustomLabelController');
const {checkPermission}=require('../middleware/checkPermission');
const authMiddleware=require('../middleware/authMiddleware');


router.post('/',contactCustomLabelController.createContactCustomLabel);
router.get('/',contactCustomLabelController.getAllContactCustomLabels);


router.put('/', contactCustomLabelController.updateContactCustomLabel);

module.exports=router;