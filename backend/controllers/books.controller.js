import mongoose from "mongoose";
import axios from "axios";

import BookInfo from "../models/book.model.js";
import User from "../models/user.models.js";
import getRealTimeTrending from "../services/trendingBooks.service.js";


const fetchAuthorExtraDetails = async (authorName) => {
  const fallback = {
    AuthorDescription: "No biography details available for this author.",
    AuthorPhoto: "https://placehold.co/150x150?text=No+Avatar"
  };

  if (!authorName || authorName === "Unknown" || authorName === "Notice") {
    return fallback;
  }

  try {

    const searchUrl = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(authorName)}`;
    const searchResponse = await axios.get(searchUrl);
    const authorKey = searchResponse.data?.docs?.[0]?.key;

    if (authorKey) {

      const authorProfileUrl = `https://openlibrary.org/authors/${authorKey}.json`;
      const profileResponse = await axios.get(authorProfileUrl);
      const data = profileResponse.data;


      let description = fallback.AuthorDescription;
      if (typeof data.bio === "string") {
        description = data.bio;
      } else if (data.bio && typeof data.bio === "object" && data.bio.value) {
        description = data.bio.value;
      }

      // Format author photo URL using Open Library's ID syntax
      let photoUrl = fallback.AuthorPhoto;
      if (data.photos && data.photos.length > 0) {
        photoUrl = `https://covers.openlibrary.org/a/id/${data.photos[0]}-L.jpg`;
      }

      return {
        AuthorDescription: description,
        AuthorPhoto: photoUrl
      };
    }
  } catch (error) {
    console.error(`Failed to automatically sync bio for ${authorName}:`, error.message);
  }

  return fallback;
};


export const saveBookWithStatus = async (req, res) => {
  try {
    const { userId, status, book } = req.body;

    if (!userId || !status || !book) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    const authorName = book.authors?.[0] || "Unknown";
    const authorExtras = await fetchAuthorExtraDetails(authorName);

    const bookData = {
      BookName: book.title,
      AuthorName: authorName,
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
      })(),

      AuthorDescription: book.authorDescription || authorExtras.AuthorDescription,
      AuthorPhoto: book.authorPhoto || authorExtras.AuthorPhoto
    };

    let existingBook = await BookInfo.findOne({
      BookName: bookData.BookName,
      AuthorName: bookData.AuthorName
    });

    if (!existingBook) {
      existingBook = await BookInfo.create(bookData);
    }

    if (!["Read", "ToRead", "CurrentlyReading"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user[status].includes(existingBook._id)) {
      user[status].push(existingBook._id);
      await user.save();
    }

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



export const getBookPreview = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    let book = null;

    if (mongoose.Types.ObjectId.isValid(bookId)) {
      const dbBook = await BookInfo.findById(bookId).lean();
      if (dbBook) {

        const authorExtras = (!dbBook.AuthorDescription || !dbBook.AuthorPhoto)
          ? await fetchAuthorExtraDetails(dbBook.AuthorName)
          : {};

        book = {
          ...dbBook,
          AverageRating: dbBook.AverageRating || "0.0",
          NumOfReviews: dbBook.NumOfReviews || 0,
          AuthorDescription: dbBook.AuthorDescription || authorExtras.AuthorDescription,
          AuthorPhoto: dbBook.AuthorPhoto || authorExtras.AuthorPhoto
        };
      }
    }

    if (!book) {
      const localRecord = await BookInfo.findOne({ googleBookId: bookId }).lean();
      
      try {
        const googleResponse = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
        );

        const volumeInfo = googleResponse.data?.volumeInfo;

        if (volumeInfo) {
          const authorName = volumeInfo.authors?.[0] || localRecord?.AuthorName || "Unknown Author";
          const authorExtras = await fetchAuthorExtraDetails(authorName);

          book = {
            ...localRecord,
            _id: bookId, 
            BookName: volumeInfo.title || localRecord?.BookName || "Unknown Title",
            AuthorName: authorName,
            Description: volumeInfo.description || localRecord?.Description || "No description available.",
            NumOfPages: volumeInfo.pageCount || localRecord?.NumOfPages || 0,
            PublicationDate: volumeInfo.publishedDate || localRecord?.PublicationDate || null,
            Image: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail || localRecord?.Image || "https://placehold.co/400x600?text=No+Cover",
            Language: volumeInfo.language === "en" ? "English" : "Other",
            AverageRating: volumeInfo.averageRating ? String(volumeInfo.averageRating) : "0.0",
            NumOfReviews: volumeInfo.ratingsCount || 0,

            AuthorDescription: localRecord?.AuthorDescription || authorExtras.AuthorDescription,
            AuthorPhoto: localRecord?.AuthorPhoto || authorExtras.AuthorPhoto
          };
        }
      } catch (apiError) {
        console.error("Google Books API real-time ratings pull failed:", apiError.message);
        
        if (localRecord) {
          book = {
            ...localRecord,
            AverageRating: localRecord.AverageRating || "0.0",
            NumOfReviews: localRecord.NumOfReviews || 0,
            AuthorDescription: localRecord.AuthorDescription || "No biography details available.",
            AuthorPhoto: localRecord.AuthorPhoto || "https://placehold.co/150x150?text=No+Avatar"
          };
        } else {
          book = {
            ...localRecord,
            _id: bookId,
            BookName: "Preview Temporarily Offline",
            AuthorName: "Notice",
            Description: "Could not pull live stream stats from Google API right now.",
            NumOfPages: 0,
            PublicationDate: null,
            Image: "https://placehold.co/400x600?text=Sync+Offline",
            Language: "English",
            AverageRating: "0.0",
            NumOfReviews: 0,
            AuthorDescription: "No biography details available.",
            AuthorPhoto: "https://placehold.co/150x150?text=No+Avatar"
          };
        }
      }
    }


    if (book && typeof book.AuthorDescription === "string") {
      book.AuthorDescription = book.AuthorDescription.split("\n\n").filter(p => p.trim() !== "");
    }

    return res.status(200).json({
      message: "Book preview retrieved successfully",
      book
    });

  } catch (error) {
    console.error("Error fetching book preview:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const fetchTrendingBooks = async (req, res) => {
  try {
    const books = await getRealTimeTrending();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load trending books" });
  }
};