import { find, filter } from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import books from './books';
import authors from './authors';
import ratings from './ratings';

const schema = `
type Query {
  books: [Book]
  book(id: Int!): Book
  authors: [Author]
  author(id: Int!): Author
  ratings(bookId: Int!): [Rating]
}

type Book {
  id: ID!
  title: String!
  price(currency: Currency = USD): Float
  author: Author
  ratings: [Rating]
}

type Author {
  id: ID!
  firstName: String!
  lastName: String!
  books: [Book]
}

type Rating {
  stars: Int!
  comment: String
  book : Book
}

enum Currency {
  USD
  EUR
}

type Mutation {
  createRating(bookId: Int!, rating: RatingInput!): Rating
}

input RatingInput {
  stars: Int!
  comment: String
}
`;

const resolvers = {
  Query: {
    books: (obj, args, context) => {
      return context.db.books;
    },
    book: (obj, args, context) => {
      return find(context.db.books, {
        id: args.id,
      });
    },
    authors: (obj, args, context) => {
      return context.db.authors;
    },
    author: (obj, args, context) => {
      return find(context.db.authors, {
        id: args.id,
      });
    },
    ratings: (obj, args, context) => {
      return context.db.ratings;
    },
  },
  Mutation: {
    createRating: (obj, args, context) => {
      const rating = { bookId: args.bookId, ...args.rating};
      context.db.ratings.push(rating);
      return rating;
    },
  },
  Book: {
    author: (book, args, context) => {
      return find(context.db.authors, {
        id: book.authorId,
      });
    },
    ratings: (book, args, context) => {
      return filter(context.db.ratings, { bookId: book.id });
    },
    price: (book, args, context) => {
      if (args.currency === 'EUR') {
        return book.price * 0.84;
      }
      return book.price;
    },
  },
  Author: {
    books: (author, args, context) => {
      return filter(context.db.books, { authorId: author.id });
    },
  },
  Rating: {
    book: (rating, args, context) => {
      return find(context.db.books, { id: rating.bookId });
    },
  },
};

const builtSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers,
});

const db = {
  books,
  authors,
  ratings,
};

function graphql(graphiql) {
  return graphqlHTTP(() =>
    // const startTime = Date.now();
    ({
      schema: builtSchema,
      graphiql,
      context: {
        db,
      },
      // extensions() {
      //   return {
      //     runTime: Date.now() - startTime
      //   };
      // }
    }));
}

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.redirect('/graphql'));

app.get('/graphql', graphql(true));
app.post('/graphql', graphql(false));

export default app;
