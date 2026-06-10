import mongoose from "mongoose";
import BookInfo from "../models/book.model.js"
import Review from "../models/reviews.model.js"
import User from "../models/user.models.js";



export const createReview = async (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { text, rating } = req.body;
    const { bookId } = req.params;
    const userId = req.user._id;

    if (!text || !rating) return res.status(400).json({ error: "You must enter a review and a rate" });

    try {
        const existingReview = await Review.findOne({ user: userId, book: bookId });
        if (existingReview) {
            return res.status(400).json({ error: "You already reviewed this book." });
        }

        const newReview = new Review({
            user: userId,
            book: bookId,
            ReviewContent: text,
            rating: rating
        });

        await newReview.save();

        // Update local BookInfo cache only if it exists
        try {
            if (mongoose.Types.ObjectId.isValid(bookId)) {
                const book = await BookInfo.findById(bookId);
                if (book) {
                    const reviews = await Review.find({ book: bookId });
                    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
                    book.AverageRating = totalRating / reviews.length;
                    book.NumOfReviews = reviews.length;
                    await book.save();
                }
            }
        } catch (err) {
            console.log("Note: Local BookInfo cache update skipped.");
        }

        return res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (error) {
        console.error("Create review error:", error);
        return res.status(500).json({ error: "Server error while creating review." });
    }
};



export const updateReadingStatus = async (req, res) => {
    const userId = req.user._id;
    const { bookId, status } = req.body;

    if (!bookId || !status) {
        return res.status(400).json({ error: "bookId and status are required" });
    }


    if (!["Read", "ToRead", "CurrentlyReading"].includes(status)) {
        return res.status(400).json({ error: "Invalid status provided" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        
        user.Read = user.Read.filter((id) => id !== bookId);
        user.ToRead = user.ToRead.filter((id) => id !== bookId);
        user.CurrentlyReading = user.CurrentlyReading.filter((id) => id !== bookId);


        user[status].push(bookId);
        
        await user.save();
        
        return res.status(200).json({ message: "Reading status updated", user });

    } catch (error) {
        console.error("Reading status update failed:", error);
        return res.status(500).json({ error: "Server error while updating reading status" });
    }
};



 export const getBookReviews = async (req, res) => {
    try {
        const { bookId } = req.params;

        const reviews = await Review.find({ book: bookId })
            .populate("user", "UserName ProfileImage")  
            .sort({ createdAt: -1 });  

        return res.status(200).json({ reviews });
    } catch (error) {
        console.error("Error fetching book reviews:", error);
        return res.status(500).json({ error: "Server error while fetching reviews." });
    }
};