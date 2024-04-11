const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});
//@desc Create new  contacts
//@route POST /api/contacts
//@access private

// const createContact = asyncHandler(async (req, res) => {
//   const data = req.body;
//   console.log("The request body is", data);
//   const { name, email, phone } = data;
//   try{
//   const contact = await Contact.create({
//     name,
//     email,
//     phone,
//     user_id:req.user.id,
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
    const user_id = req.user.id; // Correct assignment of user_id
    const contacts = await Contact.create({ ...data, user_id }); // Correct way to include user_id in the data
    res.status(201).json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//@desc Get contact with id
//@route GET /api/contacts/:id
//@access private

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
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
   if(contact.user_id.toString()!==req.user.id)
   {
    res.status(403)
    throw new Error("User don't have permission to update other user contacts")
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
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString()!==req.user.id)
  {
   res.status(403)
   throw new Error("User don't have permission to delete other user contacts")
  }

  await contact.deleteOne({_id:req.params.id}); 
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
