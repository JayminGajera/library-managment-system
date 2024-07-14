import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, Container, Divider } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const User = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBook, setFilteredBook] = useState('');
  const [error, setError] = useState('');
  const { user } = useSelector((store) => store.user);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://wrl1t22t-8055.inc1.devtunnels.ms/books/getBooks`);
      const books = response.data;

      // Log the API response
      console.log('API Response:', books);

      // Filter the books to find the one that matches the search query
      const book = books.find((b) => b.title.toLowerCase() === searchQuery.toLowerCase());

      if (book) {
        console.log('Filtered Book:', book);
        setFilteredBook(book);
        setError('');
      } else {
        console.log('No book found with that title');
        setFilteredBook(null);
        setError('No book found with that title');
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Error fetching books');
      setFilteredBook(null);
    }
  };

  return (
    <Container className="m-3 md:m-10 w-[82%] rounded-md">
      <Typography variant="h6" sx={{ fontWeight: 'bold' }} className="font-bold text-xl md:text-2xl">
        👋 Welcome {user?.name}
      </Typography>
      <Divider sx={{ borderBottomWidth: 2, marginY: 2 }} />
      <Box className="flex  m-6 w-full h-full">
        <Box className="w-[70%]">
          <Typography variant="h6" className="font-bold text-xl flex justify-center">
            Search Books:
          </Typography>
          <Box className="flex mt-4 gap-3">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
              sx={{
                height: '40px',
                '& .MuiOutlinedInput-root': {
                  height: '40px',
                  borderRadius: '25px',
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className="h-10"
              sx={{ borderRadius: '25px', height: '40px' }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box className="m-5 flex justify-center w-[30%]">
        
            <div>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="h6">{user.email}</Typography>
            <Typography variant="h6">{user.location}</Typography>
            </div>
        </Box>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Box className="mt-4">
        {filteredBook ? (
          <Card key={filteredBook.id} className="mb-4">
            <CardContent>
              <Typography variant="h6">{filteredBook.title}</Typography>
              <Typography variant="body2">{filteredBook.author}</Typography>
              <Typography variant="body2">{filteredBook.description}</Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography>No book selected</Typography>
        )}
      </Box>
    </Container>
  );
};

export default User;
