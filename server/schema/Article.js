const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subject: { type: String, required: true },
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

module.exports = mongoose.model("Article", articleSchema);
