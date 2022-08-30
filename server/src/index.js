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
    login: User
    user( id: ID!): User
    users( id: ID): [User]
    articles( id: ID): [Article]
    article( id: ID!) : Article
    subcomments( id: ID!): [Comment]
  }

  type Mutation {
    createUser(userName: String!):User
    createArticle(input: ArticleInput!):Article
    createComment(input: CommentInput!):Comment
  }

  type User {
    _id: String
    userName: String
    createdAt: String
    updatedAt: String
  }

  type Article {
    _id: String
    writerId: User
    subject:String
    content: String
    createdAt: String
    updatedAt: String
    comments:[Comment]
  }
  
  input ArticleInput {
    writerId: String!
    subject: String!
    content: String!
  }


  type Comment {
    _id: String
    writerId: User
    comment: String
    articleId: String
    commentId: String
    createdAt: String
    updatedAt: String
    subcomments:[Comment]
  }

  input CommentInput {
    writerId: String!
    comment: String!
    articleId: String
    commentId: String
  }

`);

let root = {
  hello: async () => "Hello world!",
  login: async () => {
    const ans = await User.find();
    const l = ans.length;
    let k = Math.floor(Math.random() * l);
    k = k === l ? l - 1 : k;
    return ans[k];
  },

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
    const ans = await Article.findOne({ _id: id })
      .populate({
        path: "comments",
        populate: {
          path: "writerId",
        },
        options: {
          sort: {
            createdAt: -1,
          },
        },
      })
      .populate("writerId");
    return ans;
  },
  subcomments: async ({ id }) => {
    let comments = await Comment.find({ commentId: id })
      .populate("writerId")
      .sort({ createdAt: -1 });
    return comments;
  },
  createUser: async (args, context, info) => {
    const { userName } = args;
    let user = new User({ userName });
    user = await user.save();
    return user;
  },
  createArticle: async (args, context, info) => {
    const { input } = args;

    let article = new Article({ ...input });
    article = await article.save();
    return article;
  },
  createComment: async (args, context, info) => {
    const { input } = args;
    let comment = new Comment({ ...input });
    comment = await comment.save();
    if (input.commentId) {
      let ncmt = await Comment.findOne({ _id: input.commentId });
      ncmt.subcomments.push(comment);
      ncmt = await ncmt.save();
    } else {
      let article = await Article.findOne({ _id: input.articleId });
      article.comments.push(comment);
      article = await article.save();
    }
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
