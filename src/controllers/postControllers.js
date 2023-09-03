import Post from "../models/postModel.js";

export const getAllPosts = async (req, res) => {
  try {
    console.log("requrested all");
    const posts = await Post.find({});
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = await Post.create(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};
