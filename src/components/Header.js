import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook,faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useWishlist } from '../WishlistContext';
import './Header.css';

function Header() {
  const { bookshelf } = useWishlist();


  return (
    <header className="header">
      <div className="logo-container">
        <img src="/Bookshelf.png" alt="Bookshelf Logo" className="logo" />
        <h1>Personal Bookshelf</h1>
      </div>
      <nav>
        <Link to="/" className="nav-link">
          <FontAwesomeIcon icon={faSearch} className="nav-icon" />
          Search
        </Link>
        <Link to="/bookshelf" className="nav-link">
          <FontAwesomeIcon icon={faBook} className="nav-icon" />
          My Bookshelf
        </Link>
        <Link to="/currently-reading" className="nav-link">
          <FontAwesomeIcon icon={faBookOpen} className="nav-icon" />
          In Progress
          {bookshelf.length > 0 && <span className="badge">{bookshelf.length}</span>}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
