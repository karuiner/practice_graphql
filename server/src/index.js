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
    user:User
    users:[User]
    articles:[Article]
    article:Article
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
  users: async () => {
    return await User.find();
  },
  articles: async () => {
    return await Article.find();
  },
  article: async (id) => {
    return await Article.findOne({ _id: id });
  },

  subcomments: async (id) => {
    let comment = await Comment.find();
    console.log(comment);
    return comment;
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
