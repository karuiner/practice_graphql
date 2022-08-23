const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require(`cors`);
const User = require("../schema/User");
const Article = require("../schema/Article");
const Comment = require("../schema/Comment");
let schema = buildSchema(`
  type Query {
    hello: String
    user( id: ID!): User
    users( id: ID): [User]
    articles( id: ID): [Article]
    article( id: ID!) : Article
    subcomments( id: ID!): [Comment]
  }

  type User {
    _id: String
    userName: String
    createdAt: String
    updatedAt: String
  }

  type Article {
    _id: String
    writerId: String
    content: String
    createdAt: String
    updatedAt: String
    comments:[Comment]

  }


  type Comment {
    _id: String
    writerId: String
    comment: String
    createdAt: String
    updatedAt: String
    subcomments:[Comment]
  }


`);

let root = {
  hello: async () => "Hello world!",
  user: async ({ id }) => {
    const ans = await User.findOne({ _id: id });
    return ans;
  },
  users: async () => {
    const ans = await User.find();
    return ans;
  },
  articles: async () => {
    const ans = await Article.find();
    return ans;
  },
  article: async ({ id }) => {
    const ans = await Article.findOne({ _id: id });
    return ans;
  },
  subcomments: async ({ id }) => {
    let comments = await Comment.find({ commentId: id });
    return comments;
  },
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
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DBNAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
