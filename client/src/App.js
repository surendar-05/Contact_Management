import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Button, HStack } from '@chakra-ui/react';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ContactsPage from './components/ContactPage';

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('login');

  const handleLoginSuccess = (token) => {
    console.log(token)
    setToken(token);
    setIsLoggedIn(true);
    setView('contacts');
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    setView('login');
  };

  return (
    <ChakraProvider>
      <Box maxWidth="800px" margin="auto" padding={8}>
        <VStack spacing={6}>
          <Heading>Contact Management App</Heading>
          {!isLoggedIn && (
            <HStack spacing={4}>
              <Button 
                onClick={() => setView('login')} 
                colorScheme={view === 'login' ? 'teal' : 'gray'}  
                size="lg" 
                width="150px" 
              >
                Login
              </Button>
              <Button 
                onClick={() => setView('register')}
                colorScheme={view === 'register' ? 'teal' : 'gray'} 
                size="lg"
                width="150px"
              >
                Register
              </Button>
            </HStack>
          )}
          {!isLoggedIn && view === 'login' && <LoginPage setToken={handleLoginSuccess} />}
          {!isLoggedIn && view === 'register' && <RegisterPage />}
          {isLoggedIn && <ContactsPage token={token} />}
          
          {isLoggedIn && 
            <Button 
              onClick={handleLogout}
              colorScheme="red" 
              size="lg"
              width="150px"
            >
              Logout
            </Button>
          }
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
