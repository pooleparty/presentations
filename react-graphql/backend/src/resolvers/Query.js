const books = require('../../data/books.json');

const Query = {
  books(parent, args, context, info) {
    return books;
  },
  book(parent, args, context, info) {
    return books.find(
      book => book.title.toLowerCase() === args.title.toLowerCase()
    );
  },
};

module.exports = Query;
