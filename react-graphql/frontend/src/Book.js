import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './Book.css';

const SINGLE_BOOK_QUERY = gql`
  query SINGLE_BOOK_QUERY($title: String!) {
    book(title: $title) {
      title
      author
      link
      year
    }
  }
`;

export default function Book(props) {
  return (
    <Query query={SINGLE_BOOK_QUERY} variables={{ title: props.title }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const { book } = data;

        return (
          <div class="book">
            <h1>
              {book.title} <small>by: {book.author}</small>
            </h1>
            <div>
              <strong>published:</strong> {book.year}
            </div>
            <a href={book.link}>View More</a>
          </div>
        );
      }}
    </Query>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
};
