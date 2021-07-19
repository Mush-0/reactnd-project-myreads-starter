import React from "react";
import propTypes from "prop-types";
import BookCard from "./BookCard.js";
import { get, search, update } from "./BooksAPI";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  state = { searchValue: "", searchResults: [] };
  onChange(e) {
    const value = e.target.value;
    this.setState({ searchValue: value });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      if (this.state.searchValue !== "") {
        search(this.state.searchValue).then((data) =>
          this.setState({ searchResults: data })
        );
      }
      //   Dont send search request to API if it's empty string
      else this.setState({ searchResults: "" });
    }
  }
  async addToShelf(e) {
    const newShelf = e.target.value;
    const bookID = e.target.name;
    const bookObj = await get(bookID);
    bookObj.shelf = newShelf;
    this.props.addBook(bookObj, newShelf);
    update(bookObj, newShelf);
  }

  findShelf(bookID) {
    const alreadyHere = this.props.books.filter((elem) => elem.id === bookID);
    return alreadyHere.length !== 0
      ? this.props.books.filter((elem) => elem.id === bookID)[0].shelf
      : undefined;
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button style={{ cursor: "pointer" }} className="close-search">
              Close
            </button>
          </Link>

          <div className="search-books-input-wrapper">
            <input
              onChange={(e) => this.onChange(e)}
              value={this.state.searchValue}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* Check if searchResults is Array because API returns string if search failed */}
            {Array.isArray(this.state.searchResults) ? (
              this.state.searchResults
                .filter(
                  (elem) =>
                    elem.title
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()) ||
                    (elem.authors
                      ? elem.authors
                          .join(", ")
                          .toLowerCase()
                          .includes(this.state.searchValue.toLowerCase())
                      : false)
                )
                .map((elem) => (
                  <li key={elem.id}>
                    <BookCard
                      title={elem.title}
                      img={elem.imageLinks ? elem.imageLinks.thumbnail : null}
                      authors={elem.authors || ["Unkown author"]}
                      shelf={this.findShelf(elem.id) || "none"}
                      bookID={elem.id}
                      shelfChange={(e) => this.addToShelf(e)}
                    />
                  </li>
                ))
            ) : (
              // When search fails we get string

              <li>No Authors/Titles results</li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
SearchBar.propTypes = {
  books: propTypes.array.isRequired,
};
export default SearchBar;
