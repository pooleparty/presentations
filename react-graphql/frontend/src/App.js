import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './apolloClient';
import AllBooks from './AllBooks';
// import gql from 'graphql-tag';

// client
//   .query({
//     query: gql`
//       {
//         books {
//           title
//           author
//         }
//       }
//     `,
//   })
//   .then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AllBooks />
      </ApolloProvider>
    );
  }
}

export default App;
