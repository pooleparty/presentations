import React, { Component } from 'react';
import client from './apolloClient';
import gql from 'graphql-tag';

const ALL_BOOKS_QUERY = gql`
  query ALL_BOOKS_QUERY {
    books {
      title
      author
    }
  }
`;

class App extends Component {
  componentDidMount = async () => {
    const result = await client.query({
      query: ALL_BOOKS_QUERY,
    });

    console.log(result);
  };

  render() {
    return <h1>React + GraphQL</h1>;
  }
}

export default App;
