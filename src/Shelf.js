import React from "react";
import propTypes from "prop-types";
import BookCard from "./BookCard.js";

function Shelf({ shelfName, shelfType, books, shelfChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .filter((elem) => elem.shelf === shelfType)
            .map((elem) => (
              <li key={elem.id}>
                <BookCard
                  title={elem.title}
                  img={elem.imageLinks.thumbnail}
                  authors={elem.authors}
                  shelf={elem.shelf}
                  bookID={elem.id}
                  shelfChange={shelfChange}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

Shelf.propTypes = {
  shelfName: propTypes.string.isRequired,
  shelfType: propTypes.string.isRequired,
  books: propTypes.array.isRequired,
  shelfChange: propTypes.func.isRequired,
};

export default Shelf;
