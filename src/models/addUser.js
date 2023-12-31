const mongoose = require('mongoose');

const addUserSchema = new mongoose.Schema({

    // name: { type: String, required: true },
    // startDate: { type: Date, required: true },
    // currency: { type: String, required: true },
    // logo: { type: String },
    // website: { type: String },
    // contactNumber: { type: Number },
    // alternateContactNumber: { type: String },
    // country: { type: String },
    // state: { type: String },
    // city: { type: String },
    // zipCode: { type: Number },
    // landmark: { type: String },
    // timeZone: { type: String },


    // tax1Name: { type: String },
    // tax1No: { type: String },
    // tax2Name: { type: String },
    // tax2No: { type: String },
    // financialYearStartMonth: { type: String },
    // stockAccountingMethod: { type: String, enum: ['FIFO', 'LIFO'] },


    prefix: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, },
    userName: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    cPassword: { type: String, required: true },
    
    
    
    // ROLES
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null }, // Reference to the Role collection


    // allLocations: {type: Boolean },
    // eziline: {type: Boolean },


    // salesCommissionPercentage: { type: String },
    // maxSaleDiscountPercentage: { type: String },
    
    
    // allowselectedcontacts: {type: Boolean, required: true},


    dateOfBirth: { type: Date, default: Date.now},
    gender: { type: String, },
    maritalStatus: { type: String },
    bloodGroup: { type: String },
    mobileNumber: { type: Number, },
    alternateContactNumber: { type: Number },
    familyContactNumber: { type: Number },
    facebookLink: { type: String },
    twitterLink: { type: String },


    //6 fields like customerfield 1,2,3,4 and social media 1,2

    idProofName: { type: String },
    idProofNumber: { type: Number },

    permanentAddress: { type: String },
    currentAddress: { type: String },

    //Bank details

    accountHolderName: { type: String, },
    accountNumber: { type: Number, },
    bankName: { type: String, },
    bankIdentifierCode: { type: Number, },
    branch: { type: String, },
    taxPayerId: { type: Number, },

    //HRM and Payroll


});

const AddUser = mongoose.model('AddUser', addUserSchema);

module.exports = AddUser;
