const Query = {
  books(parent, args, context, info) {
    return context.db.books;
  },
  book(parent, args, context, info) {
    return context.db.books.find(
      book => book.title.toLowerCase() === args.title.toLowerCase()
    );
  },
};

module.exports = Query;
