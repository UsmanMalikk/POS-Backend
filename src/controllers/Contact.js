


// get all contacts according to thier contacttype
const mongoose = require('mongoose');

const Contact = require('../models/Supplier')
const json2csv = require('json2csv').parse;
const PDFDocument = require('pdfkit');
const excel = require('excel4node');
const Prefix = require('../models/prefixes')
const Supplier = require('../models/Supplier');


async function generateContactId() {

  // Find the highest current number in the Supplier schema
  const highestSupplier = await Supplier.findOne().sort({ contact_id: -1 });
  // console.log(highestSupplier)

  if (!highestSupplier) {
    highestSupplier.contact_id = 0
  }
  let currentNumber = 1; // Initialize to 1 if there are no existing suppliers

  if (highestSupplier) {
    currentNumber = parseFloat(highestSupplier.contact_id) + parseFloat(1);
  }



  // Format the contact ID with the prefix and sequential number
  const formattedNumber = currentNumber.toString().padStart(4, '0'); // Adjust the padding length as needed

  return `${formattedNumber}`;
}


const getAllContacts = async (req, res) => {
  const contactType = req.params.type;
  const showAdvanceBalance = req.query.advanceBalance === 'true';
  const showOpeningBalance = req.query.openingBalance === 'true';
  const showPurchaseDue = req.query.purchaseDue === 'true';
  const showPurchaseReturn = req.query.purchaseReturn === 'true';
  const showSellDue = req.query.sellDue === 'true';
  const showSellReturn = req.query.sellReturn === 'true'
  // for contacttype supplier
  if (contactType === 'supplier') {
    try {
      let contacts;
      if (showAdvanceBalance || showOpeningBalance || showPurchaseDue || showPurchaseReturn) {
        const query = {
          contactType: 'supplier'
        };

        if (showAdvanceBalance) {
          query.advanceBalance = { $gt: 0 };
        }

        if (showOpeningBalance) {
          query.openingBalance = { $gt: 0 };
        }
        if (showPurchaseDue) {
          query.purchaseDue = { $gt: 0 };
        }
        if (showPurchaseReturn) {
          query.purchaseReturn = { $gt: 0 };
        }


        contacts = await Contact.find(query);

      } else {
        contacts = await Contact.find({ contactType: 'supplier' });
      }
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  // for contact type cutomer


  else if (contactType === 'customer') {
    try {
      let contacts;
      if (showAdvanceBalance || showOpeningBalance || showSellDue || showSellReturn) {
        const query = {
          contactType: 'customer'
        };

        if (showAdvanceBalance) {
          query.advanceBalance = { $gt: 0 };
        }

        if (showOpeningBalance) {
          query.openingBalance = { $gt: 0 };
        }
        if (showSellDue) {
          query.sellDue = { $gt: 0 };
        }
        if (showSellReturn) {
          query.sellReturn = { $gt: 0 };
        }


        contacts = await Contact.find(query);

      } else {
        contacts = await Contact.find({ contactType: 'customer' });
      }
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  }

  else {
    res.status(400).json({ error: 'Invalid contact type' });
  }

};

const exportContacts = async (req, res) => {
  const contactType = req.params.type;

  try {
    let contacts;
    if (contactType === 'supplier' || contactType === 'customer') {

      contacts = await Contact.find({ contactType });


      res.attachment(`${contactType}_contacts.csv`);
      res.type('csv');
      const csvData = json2csv(contacts);
      res.send(csvData);


      res.attachment(`${contactType}_contacts.pdf`);
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(res);
      contacts.forEach(contact => {
        pdfDoc.text(JSON.stringify(contact));
        pdfDoc.moveDown();
      });
      pdfDoc.end();


      res.attachment(`${contactType}_contacts.xlsx`);
      const wb = new excel.Workbook();
      const ws = wb.addWorksheet('Contacts');
      const style = wb.createStyle({
        font: {
          size: 12,
        },
      });
      contacts.forEach((contact, index) => {
        Object.keys(contact).forEach((field, columnIndex) => {
          ws.cell(index + 1, columnIndex + 1).string(contact[field].toString()).style(style);
        });
      });
      const excelBuffer = await wb.writeToBuffer();
      res.send(excelBuffer);
    } else {
      res.status(400).json({ error: 'Invalid contact type' });
    }
  } catch (error) {
    console.error('Error exporting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//crud for supplier
/// add new supplier

const createSupplierContact = async (req, res) => {

  try {
    const newContactData = req.body;
    // console.log(newContactData.contact_id)

    if (!newContactData.contact_id) {
      // console.log("cf")

      const generatedContactId = await generateContactId();
      newContactData.contact_id = generatedContactId;
      // console.log(newContactData.contact_id)

    }
    const newSupplierContact = new Contact({
      contactType: 'supplier',
      ...newContactData
    });
    const savedSupplierContact = await newSupplierContact.save();
    res.status(201).json(savedSupplierContact);
  } catch (error) {
    console.error('Error creating supplier contact:', error);

  }

}

// update supplier contact by itd id

const updateSupplierContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const updatedContactData = req.body;
    const updatedSupplierContact = await Contact.findByIdAndUpdate(
      contactId,
      updatedContactData ,
      { new: true }
    );
    if (updatedSupplierContact) {
      res.status(200).json(updatedSupplierContact);
    } else {
      res.status(404).json({ error: 'Supplier Contact not found' });
    }
  } catch (error) {
    console.error('Error updating supplier contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//delete supplier contact
const deleteSupplierContact = async (req, res) => {
  const contactId = req.params.id;
  console.log(contactId)
  try {
    const deletedSupplierContact = await Contact.findByIdAndDelete(contactId);
    if (deletedSupplierContact) {
      res.json({ message: 'Supplier Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Supplier Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting supplier contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/// view supplier contact by its id
const getSupplierContactById = async (req, res) => {
  const id = req.params.id;
  try {
    const supplierContact = await Contact.findById(id);
    if (supplierContact) {
      res.status(200).json(supplierContact);
    } else {
      res.status(404).json({ error: 'Supplier Contact not found' });
    }
  } catch (error) {
    console.error('Error fetching supplier contact by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// its optional delete all supplier contacts
const deleteAllSupplierContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({ contactType: 'supplier' });
    if (result.deletedCount > 0) {
      res.json({ message: 'All Supplier Contacts deleted successfully' });
    } else {
      res.status(404).json({ error: 'No Supplier Contacts found to delete' });
    }
  } catch (error) {
    console.error('Error deleting all supplier contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// customer crud operation

const createCustomerContact = async (req, res) => {
  try {
    const newContactData = req.body;
    if (!newContactData.contact_id) {
      const generatedContactId = await generateContactId();
      newContactData.contact_id = generatedContactId;

    }
    const newCustomerData = new Contact({
      contactType: 'customer',
      ...newContactData

    })
    const savedCustomerData = await newCustomerData.save();
    res.status(201).json(savedCustomerData);

  } catch (error) {
    console.error('Customer data add', error);
  }



}
const updateCustomerContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const updatedContactData = req.body;
    const updateCustomerContact = await Contact.findByIdAndUpdate(
      contactId,
      updatedContactData,
      { new: true }
    );
    if (updateCustomerContact) {
      res.status(200).json(updateCustomerContact);
    } else {
      res.status(404).json('Customer contact not found');
    }
  } catch (error) {
    console.error("Error updating customer contact", error);
    res.status(500).json({ error: 'Internal server error' });
  }

}
// delete custoemr by id
const deleteCustomerContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const deletedCustomerContact = await Contact.findByIdAndDelete(contactId);
    if (deletedCustomerContact) {
      res.json({ message: 'Customer Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting Customer contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

// get customer by id
const getCustomerContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const customerContact = await Contact.findById(contactId);
    if (customerContact) {
      res.status(200).json(customerContact);
    } else {
      res.status(404).json({ error: 'customer Contact not found' });
    }
  } catch (error) {
    console.error('Error fetching customer contact by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


}
// deele all customers
const deleteAllCustomerContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({ contactType: 'customer' });
    if (result.deletedCount > 0) {
      res.json({ message: 'All Supplier Contacts deleted successfully' });
    } else {
      res.status(404).json({ error: 'No Supplier Contacts found to delete' });
    }
  } catch (error) {
    console.error('Error deleting all supplier contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllSupCust = async (req, res) => {


  try {
    const custSup = await Contact.find();
    res.status(200).json(custSup);
  } catch (error) {
    console.error('Error fetching customer groups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getContactsWithSaleDue = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ totalSaleDue: { $gt: 0 } });
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getContactWithPurchaseDue = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ totalPurchaseDue: { $gt: 0 } });
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
  getAllContacts, createSupplierContact, updateSupplierContact,
  deleteSupplierContact,
  getSupplierContactById,
  deleteAllSupplierContacts,
  createCustomerContact,
  updateCustomerContact,
  deleteCustomerContact,
  getCustomerContactById,
  deleteAllCustomerContacts, exportContacts,
  getAllSupCust,
  getContactsWithSaleDue,
  getContactWithPurchaseDue
};