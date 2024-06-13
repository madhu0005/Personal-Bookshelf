import React, { useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import './../App.css';

const BookSearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [alert, setAlert] = useState(null);

  const searchBooks = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery) {
      try {
        const res = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`);
        setBooks(res.data.docs);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    } else {
      setBooks([]);
    }
  };

  const addToBookshelf = (book) => {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    setAlert('Book added to your Bookshelf!');
    setTimeout(() => {
      setAlert(null);
    }, 3000); // Hide alert after 3 seconds
  };

  const addToWishlist = (book) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.some(wishlistBook => wishlistBook.key === book.key)) {
      wishlist.push(book);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  };

  return (
    <div className="search-page">
      <div className="frontText">
      <h2 >Welcome To Your Personal Bookself </h2>
      </div>
      {/* <img src= "/Bookshelf.png" alt="Logo" /> */}
      <input
        type="text"
        value={query}
        onChange={searchBooks}
        placeholder="Search for books ..."
        className="search-input"
      />
      <div className="book-list">
        {books.map(book => (
          <BookCard
          key={book.key}
          book={book}
          onAddToBookshelf={addToBookshelf}
          onAddToWishlist={addToWishlist}
       
        />
        
        ))}
      </div>
      {alert && (
        <div className="alert">
          {alert}
        </div>
      )}
    </div>
  );
}

export default BookSearchPage;
