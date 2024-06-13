import { useEffect, useState } from 'react';
import './../App.css';

const CurrentlyReading = () => {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const storedCurrentlyReading = JSON.parse(localStorage.getItem('currentlyReading')) || [];
    setCurrentlyReading(storedCurrentlyReading);
  }, []);

  const removeFromCurrentlyReading = (bookKey) => {
    const updatedCurrentlyReading = currentlyReading.filter(book => book.key !== bookKey);
    setCurrentlyReading(updatedCurrentlyReading);
    localStorage.setItem('currentlyReading', JSON.stringify(updatedCurrentlyReading));
    setAlert('Book marked as completed');
    setTimeout(() => {
      setAlert(null);
    }, 3000); // Hide alert after 3 seconds
  };

  return (
    <div className="bookshelf-container">
      <h2>Currently Reading</h2>
      {alert && <div className="alert">{alert}</div>}
      <div className="book-list">
        {currentlyReading.map(book => (
          <div key={book.key} className="book-card">
            <img
              src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/128x192?text=No+Cover'}
              alt={book.title}
            />
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">Read More</a>
            <button onClick={() => removeFromCurrentlyReading(book.key)}>Completed</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyReading;
