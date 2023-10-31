const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    
    // businessName: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation', default: null, required: true },

    businessName: { type: String, required: true },
    startDate: { type: Date, required: true, default: Date.now},
    currency: { type: String, required: true },
    logo: { type: String },
    website: { type: String },
    contactNumber: { type: Number },
    alternateContactNumber: { type: Number },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipCode: { type: Number },
    landmark: { type: String },
    timeZone: { type: String },


    tax1Name: { type: String },
    tax1No: { type: Number },
    tax2Name: { type: String },
    tax2No: { type: Number },
    financialYearStartMonth: { type: String },
    stockAccountingMethod: { type: String, enum: ['FIFO', 'LIFO'] },


    prefix: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },

    role: { type: String, default: "Admin" }, // Reference to the Role collection

    dateOfBirth: { type: Date, default: Date.now},
    gender: { type: String },
    maritalStatus: { type: String },
    bloodGroup: { type: String },
    mobileNumber: { type: Number },
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

    accountHolderName: { type: String },
    accountNumber: { type: Number },
    bankName: { type: String },
    bankIdentifierCode: { type: Number },
    branch: { type: String },
    taxPayerId: { type: Number },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
