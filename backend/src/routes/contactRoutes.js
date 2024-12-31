const express = require("express");
const { createContact, deleteContact, getContactById, getContacts, updateContact } = require("../controllers/contactCtrl.js");

const router = express.Router();

router.get('/', getContacts);

router.get('/:id', getContactById);

router.post('/', createContact);

router.patch('/update/:id', updateContact);

router.delete('/delete/:id', deleteContact);

module.exports = router;
