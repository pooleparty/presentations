# React + GraphQL
## What is GraphQL
- quick primer on what graphql is and why we might want to use it
## Scaffold backend with graphql-yoga
- Setup simple schema
- Book
 - id
 - title
- start with one hardcoded Book
 -write simple Query resolver
  - get all books
   - filter?
   - sort?
  - get book by title
- manually run graphql query
## Scaffold front end with apollo-client
- Setup apollo client
 - make query using client directly and log response to the console
- Use Query HOC to query for all books
 - create link to view specific book
- We are going to want to create new Books
 - Create `createBook` Mutation
  - schema
  - resolver
  - input type?
## Other Topics
- Adding GraphQL context
 - put express request on context
 - put database object on context
- Caching
 - manual cache manipulation
