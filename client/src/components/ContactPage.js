
import React, { useState, useEffect } from 'react';
import { getContacts, deleteContact } from '../api';
import ContactForm from './ContactForm';
import {
  VStack,Heading,Box,Text,Button,HStack,useColorModeValue,useDisclosure,Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,
} from '@chakra-ui/react';

const ContactsPage = ({ token }) => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchContacts();
  }, [token]);

  const fetchContacts = async () => {
    try {
      const contactsData = await getContacts(token);
      setContacts(contactsData);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id, token);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    onOpen();
  };

  const handleCloseForm = () => {
    setEditingContact(null);
    onClose();
  };

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box bg={bgColor} minHeight="300vh" py={8}>
      <VStack spacing={8} width="full" maxWidth="800px" mx="auto">
        <Heading>Contacts</Heading>
        <Button colorScheme="blue" onClick={() => handleEdit({})}>
          Add New Contact
        </Button>
        {contacts.map((contact) => (
          <Box
            key={contact._id}
            bg={cardBgColor}
            p={4}
            borderRadius="md"
            shadow="md"
            width="full"
          >
            <HStack justifyContent="space-between">
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{contact.name}</Text>
                <Text>{contact.email}</Text>
                <Text>{contact.phone}</Text>
              </VStack>
              <HStack>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </Button>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={handleCloseForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingContact?._id ? 'Edit Contact' : 'Add New Contact'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContactForm
              contact={editingContact || {}}
              token={token}
              onSuccess={() => {
                handleCloseForm();
                fetchContacts();
              }}
              onClose={handleCloseForm}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContactsPage;
