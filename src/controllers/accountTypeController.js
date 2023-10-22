const AccountType = require('../models/accountType');

// Create a new AccountType
exports.createAccountType = async (req, res) => {
  try {
    const { name, parentAccountType } = req.body;
    const accountType = new AccountType({ name, parentAccountType });
    await accountType.save();
    res.status(201).json(accountType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing AccountType by ID
exports.updateAccountType = async (req, res) => {
  try {
    const { name, parentAccountType } = req.body;
    const { id } = req.params;
    const updatedAccountType = await AccountType.findByIdAndUpdate(
      id,
      { name, parentAccountType },
      { new: true }
    );
    if (!updatedAccountType) {
      return res.status(404).json({ error: 'AccountType not found' });
    }
    res.json(updatedAccountType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an AccountType by ID
exports.deleteAccountType = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccountType = await AccountType.findByIdAndRemove(id);
    if (!deletedAccountType) {
      return res.status(404).json({ error: 'AccountType not found' });
    }
    res.json(deletedAccountType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View all AccountTypes
exports.viewAllAccountTypes = async (req, res) => {
  try {
    const accountTypes = await AccountType.find();
    res.json(accountTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View an AccountType by ID
exports.viewAccountTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const accountType = await AccountType.findById(id);
    if (!accountType) {
      return res.status(404).json({ error: 'AccountType not found' });
    }
    res.json(accountType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
