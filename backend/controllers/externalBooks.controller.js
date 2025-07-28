import searchGoogleBooks from "../services/googleBooks.service.js";
import BookInfo from "../models/book.model.js"; 

export const fetchAndSaveBooks = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }

  try {
    const books = await searchGoogleBooks(q);

    const mapLanguageCode = (code) => {
      switch (code) {
        case "en":
          return "English";
        case "fil":
        case "tl":
          return "Filipino";
        case "fr":
          return "French";
        default:
          return "Other";
      }
    };
    

    for (const book of books) {
      const exists = await BookInfo.findOne({ BookName: book.title, AuthorName: book.authors[0] });

      if (!exists) {
        await BookInfo.create({
          BookName: book.title,
          AuthorName: book.authors[0],
          Description: book.description,
          NumOfPages: book.pageCount,
          PublicationDate: new Date(book.publishedDate),
          Language: mapLanguageCode(book.language),
        });
      }
    }

    return res.status(200).json({ message: "Books saved successfully", books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
