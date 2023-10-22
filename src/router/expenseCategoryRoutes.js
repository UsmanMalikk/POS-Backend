const express = require('express');
const router = express.Router();
const expenseCategoryController = require('../controllers/expenseCategoryController');


// Routes for expense categories
router.post('/', expenseCategoryController.createExpenseCategory);

router.get('/subs', expenseCategoryController.getCategoriesWithNonEmptyParent);

router.put('/:id', expenseCategoryController.updateExpenseCategory);

router.delete('/:id', expenseCategoryController.deleteExpenseCategory);

router.get('/', expenseCategoryController.getAllExpenseCategoriesWithoutSub);

router.get('/all', expenseCategoryController.getAllExpenseCategories);

router.get('/:id', expenseCategoryController.getExpenseCategoryById);

module.exports = router;
