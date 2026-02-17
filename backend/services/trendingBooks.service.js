import axios from "axios";

const getRealTimeTrending = async () => {
  try {
    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: "subject:fiction", 
        orderBy: "relevance", 
        maxResults: 6,
        printType: "books"
      },
    });

    if (!response.data.items) return [];

    // Map the Google data immediately to match MongoDB Schema naming convention
    return response.data.items.map((item) => ({
      googleBookId: item.id,
      BookName: item.volumeInfo.title || "Untitled",
      AuthorName: item.volumeInfo.authors?.[0] || "Unknown",
      Description: item.volumeInfo.description || "No description available",
      Image: item.volumeInfo.imageLinks?.thumbnail || "",
      NumOfPages: item.volumeInfo.pageCount || 0,
      PublicationDate: item.volumeInfo.publishedDate || "",
      Language: item.volumeInfo.language === "en" ? "English" : "Other",
      AverageRating: item.volumeInfo.averageRating || 0
    }));
  } catch (error) {
    console.error("Trending Service Error:", error.message);
    return [];
  }
};

export default getRealTimeTrending;