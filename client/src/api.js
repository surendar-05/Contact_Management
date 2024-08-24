import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    console.log(response.data);
    return response.data;
  };
  

export const getContacts = async (token) => {
  const response = await axios.get(`${API_URL}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createContact = async (contactData, token) => {
  const response = await axios.post(`${API_URL}/contacts`, contactData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateContact = async (id, contactData, token) => {
  const response = await axios.put(`${API_URL}/contacts/${id}`, contactData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteContact = async (id, token) => {
  const response = await axios.delete(`${API_URL}/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
