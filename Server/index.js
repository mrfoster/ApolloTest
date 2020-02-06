const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Book {
    id: Int!
    title: String!
  }

  type Query {
    books: Books
  }

  type Books {
    totalCount: Int!
    results: [Book!]!
  }
`;

const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets"
  },
  {
    id: 2,
    title: "Jurassic Park"
  }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => ({
      totalCount: books.length
    })
  },
  Books: {
    results: () => books
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
