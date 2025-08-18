import express from "express";
import {getBookPreview, saveBookWithStatus } from "../controllers/books.controller.js";
import { fetchBooks } from "../controllers/externalBooks.controller.js";

const router = express.Router();

router.get("/searchExternalBooks", fetchBooks);
router.post("/saveBookToList", saveBookWithStatus);
router.get("/bookPreview/:bookId", getBookPreview);


export default router;
