export default {
  // root Query resolver
  Query: {
    books(obj, args, context, info) {
      return context.db
        .loadBooks()
        .then(booksData => booksData.map(bookData => new Book(bookData)));
    },
    book(obj, args, context, info) {
      return context.db
        .loadBookByID(args.id)
        .then(bookData => new Book(bookData));
    },
  },
  // Book type resolver
  Book: {
    author(book, args, context, info) {
      return context.db
        .loadAuthorByBookID(book.id)
        .then(authorData => new Author(authorData));
    },
  },
  // ...more type resolvers
};
