import express from "express";
const router = express.Router();
import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//localhost:3000/api/v1/posts/
router.route("/").get(getAllPosts).post(authMiddleware, createPost);
router
  .route("/:id")
  .get(getPost)
  .patch(authMiddleware, updatePost)
  .delete(authMiddleware, deletePost);
export default router;
