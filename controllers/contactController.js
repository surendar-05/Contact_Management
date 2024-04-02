const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});
//@desc Create new  contacts
//@route POST /api/contacts
//@access public

// const createContact = asyncHandler(async (req, res) => {
//   const data = req.body;
//   console.log("The request body is", data);
//   const { name, email, phone } = data;
//   try{
//   const contact = await Contact.create({
//     name,
//     email,
//     phone,
//   });

//   res.status(201).json(contact);
// }
//   catch(err)
//   {
//     res.status(404);
//     throw new Error("All the Fields must be fill");
//   }
//   }
 
// );

const createContact = asyncHandler(async (req, res) => {
  const data = req.body;
  // Assuming data is an array of contact objects
  try {
    const contacts = await Contact.create(data);
    res.status(201).json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//@desc Get contact with id
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});
//@desc Update the  contact
//@route PUT /api/contacts
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updateContact);
});

//@desc delete the  contact
//@route delete /api/contacts
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
