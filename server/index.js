const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
let i = 0;
const server = new ApolloServer({
    typeDefs,
    mockEntireSchema: false,
    resolvers: {
      Mutation: {
        createUser: (_, args) => {
          return {
            id: i++,
            name: args.name,
            email: args.email,
            password: args.password
          };
        }
      }
    },
    mocks: true
  });
  

server.listen().then(({ url }) => {
  console.log(`Сервер ${url}`);
});
