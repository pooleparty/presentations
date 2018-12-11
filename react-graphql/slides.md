---
title: React + GraphQL
theme: night
---

# React + GraphQL = ❤️

---

## What is GraphQL

>"GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data"

Notes:
- Define a schema to model your data, and resolvers used to fetch your data
- Single endpoint to post queries and mutation to
- Client can specify what data to return
- Generated documentation
- Awesome toolings

---

## GraphQL server with graphql-yoga

Notes:
- graphql-yoga is by Prisma
- Super easy way to spin up a graphql server
- It's a combination of Express.js and other graphql libraries

---

## Simple schema

```graphql
type Query {
  books: [Book!]
  book(title: String!): Book
}

type Book {
  title: String!
  author: String!
  link: String
  year: Int
}
```

---

## GraphQL client with apollo

---

## Resources
- https://graphql.org/
- https://www.graphql.com/
