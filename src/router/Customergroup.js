const express = require('express')
const router = express.Router();

const {getAllCustomerGroups,createCustomerGroup,updateCustomerGroup, deleteCustomerGroup, getCustomerGroupById}=require("../controllers/CustomerGroup")

router.get('/contact/customergroup',getAllCustomerGroups);
router.get('/contact/customergroup/:id',getCustomerGroupById);

router.post('/contact/customergroup', createCustomerGroup);
router.put('/contact/customergroup/:id', updateCustomerGroup);
router.delete('/contact/customergroup/:id', deleteCustomerGroup);




module.exports = router;
