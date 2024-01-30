import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Update.css';
import useStorage from '../UseStorage';

function Update() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const location = useLocation();
  const bookId = location.pathname.split('/')[2];
  const { progress, url, error: storageError } = useStorage({ file, setFile });

  const [book, setBook] = useState({
    name: '',
    desc1: '',
    cover: '', // Initially empty
    date: '',
  });

  useEffect(() => {

    console.log(progress);
    // Fetch the existing book data based on bookId
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/books/${bookId}`);
        setBook(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    console.log(progress);
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (book.name && book.desc1 && book.date) {
        if (url) {
          // Set the book cover to the uploaded URL if available
          book.cover = url;
          console.log("Book url is", url);
        }

        // Use PUT to update an existing book
        await axios.put(`http://localhost:8800/books/${bookId}`, book);
        console.log('Book updated successfully');
        navigate('/');
      } else {
        console.error('All fields are required');
      }
    } catch (err) {
      console.error('Error updating book:', err);
    }
  };

  return (
    <div className="form">
      <h1>Update Memory</h1>
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

      <button className='btn' onClick={handleClick}>Update Book</button>

      {storageError && <p>Error uploading cover image: {storageError}</p>}
    </div>
  );
}

export default Update;
