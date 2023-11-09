const express = require('express')
const router = express.Router();


const { getAllContacts, createSupplierContact, updateSupplierContact,
    deleteSupplierContact,
    getSupplierContactById,
    deleteAllSupplierContacts,
    // customer routes
    createCustomerContact,
    updateCustomerContact,
    deleteCustomerContact,
    getCustomerContactById,
    deleteAllCustomerContacts,
    exportContacts,
    getAllSupCust,
    getContactsWithSaleDue,
    getContactWithPurchaseDue



} = require("../controllers/Contact")

router.get('/contacts', getAllSupCust);
router.get('/contacts/customer/dues', getContactsWithSaleDue);
router.get('/contacts/supplier/dues', getContactWithPurchaseDue);

router.get('/contacts/:type', getAllContacts);

router.get('/contacts/:type/export', exportContacts);
// supplier rote
router.post('/contacts/:type', createSupplierContact);
router.put('/contacts/:type/:id', updateSupplierContact);
router.delete('/contacts/supplier/:id', deleteSupplierContact);
router.get('/contacts/:type/:id', getSupplierContactById);
router.delete('/contacts/supplier', deleteAllSupplierContacts);
/// customer route
router.post('/contacts/customer', createCustomerContact);
router.put('/contacts/customer/:id', updateCustomerContact);
router.delete('/contacts/customer/:id', deleteCustomerContact);
router.get('/contacts/customer/:id', getCustomerContactById);
router.delete('/contacts/customer', deleteAllCustomerContacts);

//customergroup



module.exports = router;





