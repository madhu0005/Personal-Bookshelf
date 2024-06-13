// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import BookshelfPage from './components/BookshelfPage';
import CurrentlyReading from './components/CurrentlyReading';
import Header from './components/Header';
import { WishlistProvider } from './WishlistContext';

function App() {
  return (
    <WishlistProvider>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BookSearchPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
          <Route path="/currently-reading" element={<CurrentlyReading />} />
         
        </Routes>
      </div>
    </Router>
    </WishlistProvider>
  );
}

export default App;
