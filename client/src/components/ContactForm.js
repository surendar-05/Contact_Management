import React, { useState, useEffect } from "react";
import { createContact, updateContact } from "../api";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

const ContactForm = ({ contact = {}, token, onSuccess, onClose }) => {
  const [name, setName] = useState(contact?.name || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [phone, setPhone] = useState(contact?.phone || "");

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setEmail(contact.email || "");
      setPhone(contact.phone || "");
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contact._id) {
        await updateContact(contact._id, { name, email, phone }, token);
      } else {
        await createContact({ name, email, phone }, token);
      }
      onSuccess();
      if (onClose) onClose();
    } catch (error) {
      alert("Failed to save contact: " + error.message);
    }
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg={bgColor} p={6} borderRadius="md" shadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            {contact._id ? "Update" : "Create"}
          </Button>
          {contact._id && (
            <Button onClick={onClose} width="full" variant="outline">
              Cancel
            </Button>
          )}
        </VStack>
      </form>
    </Box>
  );
};

export default ContactForm;
