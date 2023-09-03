import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: [true, "title of post is required"] },
  body: { type: String },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
