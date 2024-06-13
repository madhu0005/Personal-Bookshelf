import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from '../WishlistContext'; // Corrected path

const BookCard = ({ book, onAddToBookshelf }) => {
  const { bookshelf, addToBookshelf } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(bookshelf.find(wishlistBook => wishlistBook.key === book.key) !== undefined);
  }, [bookshelf, book.key]);

  const bookCoverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/128x192?text=No+Cover';
  const bookLink = `https://openlibrary.org${book.key}`;

  const handleWishlistClick = () => {
    if (!isWishlisted) {
      addToBookshelf(book);
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="book-card">
      <img src={bookCoverUrl} alt={book.title} />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
        <a href={bookLink} target="_blank" rel="noopener noreferrer">Read More</a>
        <button onClick={() => onAddToBookshelf(book)}>Add to Bookshelf</button>
        <button className={`wishlist-button ${isWishlisted ? 'wishlisted' : ''}`} onClick={handleWishlistClick}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  onAddToBookshelf: PropTypes.func.isRequired,
};

export default BookCard;
