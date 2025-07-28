import BookInfo from "../models/book.model.js";




export const createBook = async (req, res) => {
    try{
        const newBook = new BookInfo(req.body);
        await newBook.save();
        res.status(201).json(newBook);
        
    } catch (error){
        res.status(400).json({ error: err.message });
    }
}


export const getAllBooks = async (req, res) => {
    try{
        const books = await BookInfo.find();
        res.status(200).json(books);

    } catch (error){
        res.status(500).json({ error: error.message });
    }
}


export const getBookById = async (req, res) => {
    try {
        const book = await BookInfo.findById(req.params.id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const updateBook = async (req, res) => {
    try {
        const updatedBook = await BookInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ error: "Book not found" });
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await BookInfo.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ error: "Book not found" });
        res.status(200).json({ message: "Book deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};