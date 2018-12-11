import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';
import Books from './Books';
import Book from './Book';
import './App.css';

class App extends Component {
  state = {
    selectedBookTitle: undefined,
  };

  onSelectBook = title => {
    this.setState({ selectedBookTitle: title });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="app">
          <h1>React + GraphQL</h1>
          <hr />
          <div className="book-container">
            <Books selectBook={this.onSelectBook} />
            {this.state.selectedBookTitle && (
              <Book title={this.state.selectedBookTitle} />
            )}
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
