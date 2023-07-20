import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import axios from 'axios';

const UserSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [allUsernames, setAllUsernames] = useState([]);

  useEffect(() => {
    // Fetch all usernames from the backend
    const fetchAllUsernames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Users', {
          withCredentials: true,
        });
        setAllUsernames(response.data.usernames);
      } catch (error) {
        console.error('Error fetching all usernames:', error);
      }
    };
    fetchAllUsernames();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Perform the search locally in the array of all usernames
    const searchResult = allUsernames.find(
      (username) => username.toLowerCase() === searchText.toLowerCase().trim()
    );

    if (searchResult) {
      setSearchResult(searchResult);
    } else {
      setSearchResult(null);
      alert('User not found.');
    }
  };

  return (
    <div>
      <h1>User Search</h1>
      {/* <Home fontSize="large" /> */}
      <form onSubmit={handleSearch}>
        <TextField
          label="Search user by username..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      {searchResult && (
        <div>
          <h2>Search Result</h2>
          <p>Username: {searchResult}</p>
          {/* You can fetch additional details of the user here if needed */}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
 