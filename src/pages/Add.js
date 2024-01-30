import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStorage from '../UseStorage';
// import './Add.css'

import './Addj.css';

function Add() {
  const [file, setFile] = useState(null);
  const { progress, url, error: storageError } = useStorage({ file, setFile });
  const navigate = useNavigate();

  const [book, setBook] = useState({
    name: '',
    desc1: '',
    date: '',
    username: '',
    category: '', // Add 'category' to the initial state
  });

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (book.name && book.desc1 && book.date && url && book.username && book.category) {
        // Use the URL of the uploaded image
        book.cover = url;

        // Send the book data along with the category to the server
        await axios.post('http://localhost:8800/books', book);
        console.log('Book added successfully');
        navigate('/');
      } else {
        console.error('All fields are required');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch categories from the server
    axios.get('http://localhost:8800/categories')
    .then((response) => {
      setCategories(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
    });
  
  }, []);

  return (
    <div className="form">
      <h1>Add new Memory</h1>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Title"
        name="name"
        value={book.name}
      />
      <input
        type="text"
        onChange={handleChange}
        placeholder="Description"
        name="desc1"
        value={book.desc1}
      />
      <input
        type="text"
        onChange={handleChange}
        placeholder="Username"
        name="username"
        value={book.username}
      />
      
     <select
  onChange={handleChange}
  name="category"
  value={book.category}
>
  <option value="">Select a category</option>
  {categories.map((category) => (
    <option key={category.category_id} value={category.category_name}>
      {category.category_name}
    </option>
  ))}
</select>

      <input
        type="date"
        onChange={handleChange}
        placeholder="Date"
        name="date"
        value={book.date}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {url ? (
        <button onClick={handleClick}>Add Book</button>
      ) : (
        <button disabled>Add Book</button>
      )}
    </div>
  );
}

export default Add;
