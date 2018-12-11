const Mutation = {
  createBook(parent, args, context, info) {
    console.log(args);
    const newBook = { ...args };
    context.db.books.push(newBook);
    return newBook;
  },
};

module.exports = Mutation;
