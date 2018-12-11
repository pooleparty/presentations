import ApolloClient from 'apollo-boost';
import { endpoint } from './config';

const client = new ApolloClient({
  uri: endpoint,
});

export default client;
