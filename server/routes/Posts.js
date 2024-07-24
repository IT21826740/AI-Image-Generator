import express from "express";
import { getAllPosts, createPost } from "../controllers/Posts.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);

export default router;
