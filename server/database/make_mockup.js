const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    userName: { type: String, required: true },
  },
  { timestamps: true }
);

const articleSchema = new Schema(
  {
    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    content: { type: String, required: true },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
const commentSchema = new Schema(
  {
    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    comment: { type: String, required: true },
    subcomments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DBNAME,
});

const User = model("User", userSchema);
const Article = model("Article", articleSchema);
const Comment = model("Comment", commentSchema);

async function f() {
  let mode = "new";

  if (mode === "new") {
    await User.collection.drop();
    await Article.collection.drop();
    await Comment.collection.drop();
  }

  let editer = await User.findOne({ userName: "editer" });
  if (editer === null) {
    editer = new User({
      userName: "editer",
    });
    editer = await editer.save();
  }
  console.log(editer._id);

  let article = await Article.findOne();

  if (article === null) {
    article = new Article({
      writerId: editer._id,
      content: "test_content",
    });
    article = await article.save();
  }

  let users = await User.find({ userName: { $ne: "editer" } });
  if (users === null || users.length === 0) {
    users = [];
    for (let i = 0; i < 50; i++) {
      let userName = `userName${`${i}`.padStart(4, "0")}`;
      users.push({ userName });
    }
    users = await User.insertMany(users);
  }

  let comments = await Comment.find(),
    c = 0;
  if (comments === null || comments.length === 0) {
    for (let i = 0; i < 12; i++) {
      let k = Math.floor(Math.random() * 50);
      k = k > 49 ? 49 : k;
      let l = Math.floor(Math.random() * 10);
      l = l > 9 ? 9 : l;
      console.log(k, users[k]);
      let comment = new Comment({
        writerId: users[k]._id,
        articleId: article._id,
        comment: `comment${`${c}`.padStart(4, "0")}`,
      });
      c++;
      comment = await comment.save();
      for (let j = 0; j <= l; j++) {
        let subcomment = new Comment({
          writerId: users[k]._id,
          commentId: comment._id,
          comment: `comment${`${c}`.padStart(4, "0")}`,
        });
        c++;
        comment.subcomments.push(subcomment);
        subcomment = await subcomment.save();
      }
      comment = await comment.save();
    }
  }

  await mongoose.disconnect();
}

f();
