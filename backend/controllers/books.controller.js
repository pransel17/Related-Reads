import BookInfo from "../models/book.model.js";
import User from "../models/user.models.js";
import getRealTimeTrending from "../services/trendingBooks.service.js";


export const saveBookWithStatus = async (req, res) => {
  try {
    const { userId, status, book } = req.body;
    // book = { title, authors, description, pageCount, publishedDate, language }

    if (!userId || !status || !book) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Map googleBooks fields to your schema
    const bookData = {
      BookName: book.title,
      AuthorName: book.authors?.[0] || "Unknown",
      Description: book.description || "",
      NumOfPages: book.pageCount || 0,
      PublicationDate: book.publishedDate ? new Date(book.publishedDate) : null,
      Language: (() => {
        switch (book.language) {
          case "en": return "English";
          case "fil":
          case "tl": return "Filipino";
          case "fr": return "French";
          default: return "Other";
        }
      })()
    };

    // 1️⃣ Check if book already exists
    let existingBook = await BookInfo.findOne({
      BookName: bookData.BookName,
      AuthorName: bookData.AuthorName
    });

    // 2️⃣ If not exist, save it
    if (!existingBook) {
      existingBook = await BookInfo.create(bookData);
    }

    // 3️⃣ Add book to user's reading list
    if (!["Read", "ToRead", "CurrentlyReading"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Avoid duplicates
    if (!user[status].includes(existingBook._id)) {
      user[status].push(existingBook._id);
      await user.save();
    }

    // Return updated user with populated lists
    const updatedUser = await User.findById(userId)
      .populate("Read")
      .populate("ToRead")
      .populate("CurrentlyReading");

    res.status(200).json({
      message: `Book saved under ${status}`,
      book: existingBook,
      user: updatedUser
    });

  } catch (error) {
    console.error("Error saving book with status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get book info / preview by ID
export const getBookPreview = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    const book = await BookInfo.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book preview retrieved successfully",
      book
    });

  } catch (error) {
    console.error("Error fetching book preview:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// for trending books 
// TRENDING CONTROLLER (Zero MongoDB Load)
export const fetchTrendingBooks = async (req, res) => {
  try {
    const books = await getRealTimeTrending();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load trending books" });
  }
};