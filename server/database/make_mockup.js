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

    contents: { type: String, required: true },
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
  let user = await User.findOne();
  if (user === null) {
    user = await new User({
      userName: "test",
    });
    user = await user.save();
  }
  console.log(user._id);

  await mongoose.disconnect();
}

f();
