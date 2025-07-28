import axios from "axios";

const searchGoogleBooks = async (query) => {
  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: query,
        maxResults: 1,
      },
    });

    

    return response.data.items.map((item) => ({
      googleBookId: item.id,
      title: item.volumeInfo.title || "Untitled",
      authors: item.volumeInfo.authors || ["Unknown"],
      description: item.volumeInfo.description || "No description available",
      pageCount: item.volumeInfo.pageCount || 0,
      publishedDate: item.volumeInfo.publishedDate || "1900-01-01",
      language: item.volumeInfo.language || "en",
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
    }));
  } catch (error) {
    console.error("Google Books API Error:", error.message);
    throw new Error("Failed to fetch from Google Books API.");
  }
};

export default searchGoogleBooks;
