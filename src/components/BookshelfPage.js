import { useEffect, useState } from 'react';
import './../App.css';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBooks);
  }, []);

  const removeFromBookshelf = (bookKey) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookKey);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const addToCurrentlyReading = (book) => {
    console.log('Adding to currently reading:', book);
    let currentlyReading = JSON.parse(localStorage.getItem('currentlyReading')) || [];
    currentlyReading.push(book);
    localStorage.setItem('currentlyReading', JSON.stringify(currentlyReading));
    setAlert('Book added to your Currently Reading list!');

    // Hide the alert after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleDelete = (bookKey) => {
    removeFromBookshelf(bookKey);
  };

  return (
    <div className="bookshelf-container">
      <h2>My Bookshelf</h2>
      {alert && <div className="alert">{alert}</div>}
      <div className="book-list">
        {bookshelf.map(book => (
          <div key={book.key} className="book-card">
            <img
              src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/128x192?text=No+Cover'}
              alt={book.title}
            />
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">Read More</a>
            <button onClick={() => handleDelete(book.key)}>Remove</button>
            <button onClick={() => addToCurrentlyReading(book)}>Add to Currently Reading</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookshelfPage;
