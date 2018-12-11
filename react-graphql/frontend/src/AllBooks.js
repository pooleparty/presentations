import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query GET_ALL_BOOKS {
    books {
      title
      author
    }
  }
`;

export default function AllBooks() {
  return (
    <Query query={query}>
      {/* NOTICE: these parameters are destructured */}
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        // return <pre>{JSON.stringify(data, null, 2)}</pre>;
        // NOTICE: the property to access on data depends on the query
        return data.books.map(book => (
          <div key={book.title + book.author}>
            <h1>
              {book.title} <small>by: {book.author}</small>
            </h1>
          </div>
        ));
      }}
    </Query>
  );
}
