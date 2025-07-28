import express from "express";
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/books.controller.js";
import { fetchAndSaveBooks } from "../controllers/externalBooks.controller.js"

const router = express.Router();

router.post("/createBook", createBook);
router.get("/getAllBooks", getAllBooks);
router.get("/getBookById/:id", getBookById);
router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

router.get("/searchExternalBooks", fetchAndSaveBooks);

export default router;
