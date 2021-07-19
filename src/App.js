import React from "react";
import "./App.css";
import Shelf from "./Shelf.js";
import { getAll, update } from "./BooksAPI";
import SearchBar from "./SearchBar";
import { Route, Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = { books: [] };
  // addBook used at <SearchBar>
  addBook(bookObj, newShelf) {
    // If it is a new book (not in our book state) => We add it to state
    if (!this.state.books.map((book) => book.id).includes(bookObj.id)) {
      this.setState((prevState) => ({ books: [...prevState.books, bookObj] }));
      // console.log("Added new book", bookObj.id, newShelf); //Debugging
    }
    // If we already have it in state =>We change its shelf property
    else {
      // console.log("updated old book", bookObj.id, newShelf); //Debugging
      this.changeShelf(bookObj.id, newShelf);
    }
  }
  changeShelf(bookID, newShelf) {
    const selectedBook = this.state.books.filter(
      (elem) => elem.id === bookID
    )[0]; //Returns the book obj
    selectedBook.shelf = newShelf;
    const bookIndx = this.state.books.indexOf(selectedBook);
    const newBooks = this.state.books;
    newBooks.splice(bookIndx, 1, selectedBook);
    this.setState({ books: newBooks });
    //Update the book API for future fetching
    update(selectedBook, newShelf);
  }
  shelfChange(e) {
    const newShelf = e.target.value;
    const bookID = e.target.name;
    this.changeShelf(bookID, newShelf);
  }
  componentDidMount() {
    getAll().then((data) => {
      this.setState({ books: data });
    });
  }
  render() {
    return (
      <div className="app">
        <Route path="/search">
          <SearchBar
            books={this.state.books}
            onClickHandle={() => this.setState({ showSearchPage: false })}
            addBook={(bookObj, newShelf) => this.addBook(bookObj, newShelf)}
          />
        </Route>
        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  shelfName="Currently Reading"
                  shelfType="currentlyReading"
                  books={this.state.books}
                  shelfChange={(e) => {
                    this.shelfChange(e);
                  }}
                />
                <Shelf
                  shelfName="Want to Read"
                  shelfType="wantToRead"
                  books={this.state.books}
                  shelfChange={(e) => {
                    this.shelfChange(e);
                  }}
                />
                <Shelf
                  shelfName="Read"
                  shelfType="read"
                  books={this.state.books}
                  shelfChange={(e) => {
                    this.shelfChange(e);
                  }}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">
                <button style={{ cursor: "pointer" }}>Add a book</button>
              </Link>
            </div>
          </div>
          )
        </Route>
      </div>
    );
  }
}

export default BooksApp;
