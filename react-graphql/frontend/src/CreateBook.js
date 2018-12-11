import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_BOOKS_QUERY } from './Books';

export const CREATE_BOOK = gql`
  mutation CREATE_BOOK($title: String!, $author: String!) {
    createBook(title: $title, author: $author) {
      title
    }
  }
`;

export default class CreateBook extends React.Component {
  state = {
    title: '',
    author: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_BOOK}
        variables={this.state}
        // refetchQueries={[
        //   {
        //     query: ALL_BOOKS_QUERY,
        //   },
        // ]}
      >
        {(createBook, { loading, error }) => {
          return (
            <form
              onSubmit={async e => {
                e.preventDefault();
                e.target.reset();
                const res = await createBook();
                console.log(res);
              }}
            >
              {error && <h2>{error}</h2>}
              <fieldset disabled={loading}>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter Book Title"
                    required
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="title">
                  Author
                  <input
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Enter Book Author"
                    required
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </form>
          );
        }}
      </Mutation>
    );
  }
}
