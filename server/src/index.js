const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require(`cors`);
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

let root = { hello: () => "Hello world!" };

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
