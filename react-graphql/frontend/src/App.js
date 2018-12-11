import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';
import gql from 'graphql-tag';

const query = gql`
  query GET_ALL_BOOKS {
    books {
      title
      author
    }
  }
`;

class App extends Component {
  componentDidMount = async () => {
    const result = await client.query({
      query,
    });

    console.log(result);
  };

  render() {
    return <h1>React + GraphQL</h1>;
  }
}

export default App;
