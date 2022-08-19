const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require(`cors`);
let schema = buildSchema(`
  type Query {
    hello: String
    user:User
    article:[Article]
    subcomments:[Comment]
  }

  type User {
    _id: String
    userName: String
  }

  type Article {
    _id: String
    writerId: String
    content: String
    comments:[Comment]

  }

  type Comment {
    _id: String
    writerId: String
    comment: String
    subcomments:[Comment]
  }

`);

let root = {
  hello: async () => "Hello world!",
  user: async () => "test",
  article: async () => [
    { _id: "1234", writeId: "2345", content: "test", comments: [] },
  ],
  subcomments: async () => [
    {
      _id: "23132",
      writerId: "64754",
      comment: "ttete",
      subcomments: [],
    },
  ],
};

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
