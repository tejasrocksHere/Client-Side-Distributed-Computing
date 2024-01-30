import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Books.css'; // Import your CSS for card styling here

function Book() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [isCoverSelected, setIsCoverSelected] = useState(false); // Track cover selection

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error(err);
      }
    }

    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  // Function to handle cover file selection
  const handleCoverSelection = (e) => {
    if (e.target.files.length > 0) {
      setIsCoverSelected(true);
    } else {
      setIsCoverSelected(false);
    }
  };

  return (
    <>
      <Link to="/add">
         <button className='btn'>Add New 📷</button>
      </Link>
      <main className='main'>
        {loading ? (
          <div className="progress-bar">Loading...</div>
        ) : (
          <div className="box">
            {books.map((book) => (
              <div className="card" key={book.id}>
                <div className="imgBx">
                  <img src={book.cover} alt={`Cover for ${book.name}`} />
                </div>
                <div className="details">
                  <h2>{book.name}<br /></h2>
                  <h4>{book.username}<br /></h4>
                  <span> {book.desc1}</span>
                  <div className="card-buttons">
                    <button onClick={() => handleDelete(book.id)} className="deletebtn btn">
                      Delete
                    </button>
                    <Link to={`/update/${book.id}`}>
                      <button className="updatebtn btn">
                        Update
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Book;
