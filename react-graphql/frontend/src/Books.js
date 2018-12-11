import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './Books.css';

const ALL_BOOKS_QUERY = gql`
  query ALL_BOOKS_QUERY {
    books {
      title
      author
    }
  }
`;

export default function Books(props) {
  return (
    <Query query={ALL_BOOKS_QUERY}>
      {/* NOTICE: these parameters are destructured */}
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        // return <pre>{JSON.stringify(data, null, 2)}</pre>;
        // NOTICE: the property to access on data depends on the query
        return (
          <div className="books">
            {data.books.map(book => (
              <div key={book.title + book.author}>
                <h1>
                  {book.title} <small>by: {book.author}</small>
                </h1>
                <button onClick={() => props.selectBook(book.title)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
}

Books.propTypes = {
  selectBook: PropTypes.func.isRequired,
};
