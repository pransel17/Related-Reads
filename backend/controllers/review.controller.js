import BookInfo from "../models/book.model.js"
import Review from "../models/reviews.model.js"
import User from "../models/user.models.js";

export const createReview = async (req,res) => {
    const {text, rating} = req.body;
    const {bookId} = req.params;
    const userId = req.user._id;

    if(!text && !rating ) return res.status(400).json({error: "You must enter a review and a rate"})

    try{
        const book = await BookInfo.findById(bookId) // instantiate ng bookInfo
        if(!book) return res.status(404).json({message: "Book not found"})

        const existingReview = await Review.findOne({ user: userId, book: bookId})
        if(existingReview) {
            return res.status(400).json({ error: "You already reviewed this book." })
        } 

        // if all goods
        // instantiate review
        const newReview = new Review({
            user: userId,
            book: bookId,
            ReviewContent: text,
            rating: rating
        })

        await newReview.save()

        // modifyy the book info data
        const reviews = await Review.find({book: bookId })
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        
        // di na me nag instatiate ng buong blueprint for bookinfo kase ito lang naman needed ko
        book.AverageRating = totalRating / reviews.length;
        book.NumOfReviews = reviews.length; 
        await book.save();
        return res.status(201).json({ message: "Review created successfully", review: newReview });

       
    } catch (error){
        console.error("Create review error:", error);
        return res.status(500).json({ error: "Server error while creating review." });
    }
}


export const updateReadingStatus = async (req,res) => {
    const userId = req.user._id;
    const {bookId, status} =  req.body;

    if (!req.body) { //  FOR DEBUGGING JUSMEEE
        return res.status(400).json({ error: "Request body is missing" });
    }

    if (!bookId || !status) {
        return res.status(400).json({ error: "bookId and status are required" });
    }

    if(!["Read", "ToRead", "CurrentlyReading"].includes(status)) {
    return res.status(400).json({ error: "Invalid status provided" });
    }
    

    try{
        const user = await User.findById(userId); // instatiating so i can access the User schema 
        if (!user)  return res.status(404).json({ error: "User not found" })

        // for an instance na existing na yung book id in any status 
        // keep only the book ids that are NOT equal to bookid
        user.Read = user.Read.filter((id) => id.toString() !== bookId);
        user.ToRead = user.ToRead.filter((id) => id.toString() !== bookId);
        user.CurrentlyReading = user.CurrentlyReading.filter((id) => id.toString() !== bookId);

        user[status].push(bookId);
        await user.save();
        return res.status(200).json({ message: "Reading status updated", user });

    } catch (error){
        console.error("Reading status update failed:", error);
        return res.status(500).json({ error: "Server error while updating reading status" });
    }
}
