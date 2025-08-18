import searchGoogleBooks from "../services/googleBooks.service.js";

export const fetchBooks = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }

  try {
    const books = await searchGoogleBooks(q);
    return res.status(200).json({ books });  // just return results
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
