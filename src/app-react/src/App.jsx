import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Heading,
  Text,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ id: '', fname: '', lname: '', age: '' });

  const apiUrl = `http://${import.meta.env.VITE_REACT_APP_API_HOST}:${import.meta.env.VITE_REACT_APP_API_PORT}`;

  const openModal = (type) => {
    setModalType(type);
    setFormData({ id: '', fname: '', lname: '', age: '' });
    onOpen();
  };

  const closeModal = () => {
    onClose();
    setModalType(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/get_users`);
      const data = await response.json();
      setUsers(data);
      setMessage('Users fetched successfully');
    } catch (error) {
      setMessage('Error fetching users');
    }
    setLoading(false);
    openModal('getUsers'); // Open modal after loading completes
  };

  const fetchUserById = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/get_user_by_id/${formData.id}`);
      const data = await response.json();
      setUsers([data]);
      setMessage(`User ${formData.id} fetched successfully`);
      closeModal();
    } catch (error) {
      setMessage('Error fetching user by ID');
    }
    setLoading(false);
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/create_user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fname: formData.fname, lname: formData.lname, age: formData.age }),
      });
      const data = await response.json();
      setMessage(`User created with ID: ${data.id}`);
      closeModal();
    } catch (error) {
      setMessage('Error creating user');
    }
    setLoading(false);
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await fetch(`${apiUrl}/delete_user_by_id/${formData.id}`, { method: 'DELETE' });
      setMessage(`User ${formData.id} deleted successfully`);
      closeModal();
    } catch (error) {
      setMessage('Error deleting user');
    }
    setLoading(false);
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      await fetch(`${apiUrl}/update_user_by_id/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fname: formData.fname, lname: formData.lname, age: formData.age }),
      });
      setMessage(`User ${formData.id} updated successfully`);
      closeModal();
    } catch (error) {
      setMessage('Error updating user');
    }
    setLoading(false);
  };

  const confirmAndDeleteUser = async (id) => {
    if (window.confirm(`Are you sure you want to delete user with ID ${id}?`)) {
      setLoading(true);
      try {
        await fetch(`${apiUrl}/delete_user_by_id/${id}`, { method: 'DELETE' });
        setMessage(`User ${id} deleted successfully`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.uuid !== id)); // Remove user from list
      } catch (error) {
        setMessage('Error deleting user');
      }
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" p={5}>
        {loading && <Spinner size="xl" color="teal.500" />}
        <Heading mb={6}>User Management</Heading>
        <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap" mb={4}>
          <Button colorScheme="teal" onClick={fetchUsers}>Get Users</Button>
          <Button colorScheme="teal" onClick={() => openModal('getUserById')}>Get User By ID</Button>
          <Button colorScheme="teal" onClick={() => openModal('createUser')}>Create User</Button>
          <Button colorScheme="teal" onClick={() => openModal('deleteUser')}>Delete User By ID</Button>
          <Button colorScheme="teal" onClick={() => openModal('updateUser')}>Update User By ID</Button>
        </Box>
        {message && <Text fontSize="lg" color="green.500" mt={4}>{message}</Text>}
        
        {/* Modal */}
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {modalType === 'getUsers' && 'Users List'}
              {modalType === 'getUserById' && 'Get User By ID'}
              {modalType === 'createUser' && 'Create User'}
              {modalType === 'deleteUser' && 'Delete User'}
              {modalType === 'updateUser' && 'Update User'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalType === 'getUsers' && (
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Age</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {users.map((user) => (
                        <Tr key={user.uuid}>
                          <Td>{user.uuid}</Td>
                          <Td>{user.fname}</Td>
                          <Td>{user.lname}</Td>
                          <Td>{user.age}</Td>
                          <Td>
                            <IconButton
                              icon={<DeleteIcon />}
                              colorScheme="red"
                              onClick={() => confirmAndDeleteUser(user.uuid)}
                              aria-label="Delete user"
                              size="sm"
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
              {/* Additional Modal Content */}
              {modalType === 'getUserById' && (
                <Box>
                  <Input placeholder="Enter User ID" name="id" value={formData.id} onChange={handleInputChange} />
                  <Button mt={4} colorScheme="teal" onClick={fetchUserById}>Fetch User</Button>
                </Box>
              )}
              {modalType === 'createUser' && (
                <Box>
                  <Input placeholder="First Name" name="fname" value={formData.fname} onChange={handleInputChange} mb={3} />
                  <Input placeholder="Last Name" name="lname" value={formData.lname} onChange={handleInputChange} mb={3} />
                  <Input placeholder="Age" name="age" value={formData.age} onChange={handleInputChange} mb={3} />
                  <Button colorScheme="teal" onClick={handleCreateUser}>Submit</Button>
                </Box>
              )}
              {modalType === 'deleteUser' && (
                <Box>
                  <Input placeholder="User ID" name="id" value={formData.id} onChange={handleInputChange} />
                  <Button mt={4} colorScheme="red" onClick={handleDeleteUser}>Delete</Button>
                </Box>
              )}
              {modalType === 'updateUser' && (
                <Box>
                  <Input placeholder="User ID" name="id" value={formData.id} onChange={handleInputChange} />
                  <Button mt={4} colorScheme="teal" onClick={() => fetchUserById(formData.id)}>Load User</Button>
                  {formData.id && (
                    <>
                      <Input mt={3} placeholder="First Name" name="fname" value={formData.fname} onChange={handleInputChange} />
                      <Input mt={3} placeholder="Last Name" name="lname" value={formData.lname} onChange={handleInputChange} />
                      <Input mt={3} placeholder="Age" name="age" value={formData.age} onChange={handleInputChange} />
                      <Button mt={4} colorScheme="teal" onClick={handleUpdateUser}>Update</Button>
                    </>
                  )}
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" onClick={closeModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

export default App;
