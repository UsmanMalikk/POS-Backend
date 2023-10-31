const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const supplierSchema = new Schema({
    
   
    contactType: {
        type: String,
        enum: ['supplier', 'customer'],
        required: true
    },
    
    entity: {
        type: String,

    },

    contact_id: {type: String, unique: true, default:0},
    customer_grp: {
        type: Schema.Types.ObjectId,
        ref: 'CustomerGroup',
        default: null
    },
    businessName:String,

    dateOfBirth: Date,
    prefix: String, // Prefix field
    firstName: String,
    middleName: String, // Middle Name field
    lastName: String,
    mobile:  String,
    alternateContactNumber:  String,
    purchaseDue:Number,
    purchaseReturn:Number,
    sellDue:Number,
    sellReturn:Number,

     // Optional field
    landline: String, // Optional field
    email: String,
    assignedTo: {
        type: String,
    },
    taxNumber: String,
    openingBalance: Number,
    advanceBalance:Number,
    payTerm: {
        type: String,
    },
    addressLine1: String, 
    addressLine2: String, 
    city: String,
    state: String,
    country: String,
    zipCode: String, // Zip/Postal Code
    customField1: String, 
    customField2: String, 
    customField3: String, 
    customField4: String, 
    customField5: String, 
    customField6: String, 
    customField7: String, 
    customField8: String, 
    customField9: String, 
    customField10: String,
    shippingAdress:String,
    totalPurchaseDue:{type: Number ,default:0},
    totalSaleDue:{type:Number, default:0}
});

const Contact = mongoose.model("Supplier", supplierSchema);
module.exports = Contact;