import React from "react";
import propTypes from "prop-types";

function DropMenu({ shelf, shelfChange, bookID }) {
  return (
    <div className="book-shelf-changer">
      <select name={bookID} onChange={shelfChange} value={shelf}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

DropMenu.propTypes = {
  shelf: propTypes.string.isRequired,
  shelfChange: propTypes.func.isRequired,
  bookID: propTypes.string.isRequired,
};

export default DropMenu;
