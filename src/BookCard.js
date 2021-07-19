import React from "react";
import propTypes from "prop-types";
import DropMenu from "./DropMenu";

function BookCard({ title, authors, img, shelf, shelfChange, bookID }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${img ||"http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"})`,
          }}
        />
        <DropMenu bookID={bookID} shelf={shelf} shelfChange={shelfChange} />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
}

BookCard.propTypes = {
  title: propTypes.string.isRequired,
  authors: propTypes.array.isRequired,
  img: propTypes.string,
  shelf: propTypes.string.isRequired,
  shelfChange: propTypes.func.isRequired,
  bookID: propTypes.string.isRequired,
};

export default BookCard;
