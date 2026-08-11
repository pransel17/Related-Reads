import axios from "axios";

let cache = null
let cacheTime = 0
const CACHE_TTL = 30 * 60 * 1000

const getRealTimeTrending = async () => {
  const now = Date.now()
  if (cache && now - cacheTime < CACHE_TTL) {
    return cache
  }

  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: "subject:fiction", 
        key: process.env.GOOGLE_BOOKS_API_KEY,
        orderBy: "relevance", 
        maxResults: 6,
        printType: "books"
      },
    });

    if (!response.data.items) return [];

    cache = response.data.items.map((item) => ({
      googleBookId: item.id,
      BookName: item.volumeInfo.title || "Untitled",
      AuthorName: item.volumeInfo.authors?.[0] || "Unknown",
      Description: item.volumeInfo.description || "No description available",
      Image: item.volumeInfo.imageLinks?.thumbnail || "",
      NumOfPages: item.volumeInfo.pageCount || 0,
      PublicationDate: item.volumeInfo.publishedDate || "",
      Language: item.volumeInfo.language === "en" ? "English" : "Other",
      AverageRating: item.volumeInfo.averageRating || 0
    }))
    cacheTime = now

    return cache
  } catch (error) {
    if (cache) {
      console.warn("Google API rate limited, serving cached trending books")
      return cache
    }
    console.error("Trending Service Error:", error.message);
    return [];
  }
};

export default getRealTimeTrending;