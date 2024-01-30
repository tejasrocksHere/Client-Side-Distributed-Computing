import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
  const [allBooks, setAllBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [foundBooks, setFoundBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setAllBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllBooks();
  }, []);

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
  
    if (searchTerm === '') {
      // No search term, show all books
      setFoundBooks(allBooks);
      setSelectedBook(null); // Clear the selected book when the search is empty
    } else {
      // Search term present, filter the books by username
      const found = allBooks.filter((book) =>
        book.username?.toLowerCase().includes(searchTerm)
      );
      setFoundBooks(found);
    }
  
    document.documentElement.style.setProperty('--background-color', 'blue');
  };
  

  const handleCardClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        value={search}
        placeholder="Search by Username..."
      />

      {selectedBook && search.length > 0 && (
        <div className="card">
          <img src={selectedBook.cover} alt={selectedBook.name} />
          <h3>{selectedBook.name}</h3>
        </div>
      )}

      {foundBooks.length > 0 && search.length > 0 && (
        <div className="card-container">
          {foundBooks.map((book) => (
            <div className="card" key={book.id} onClick={() => handleCardClick(book)}>
              <img src={book.cover} alt={book.name} />
              <h3>{book.name}</h3>
            </div>
          ))}
        </div>
      )}

      {foundBooks.length === 0 && search && (
        <p>No books found with the username "{search}"</p>
      )}
    </div>
  );
}

export default Navbar;
