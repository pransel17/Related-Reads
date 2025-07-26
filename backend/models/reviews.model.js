// schema for each review panel


import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    Like: {
        type: Number,
    },
    Comment: {
        type: String
    },


})


const UserBookReview = mongoose.model("User", reviewSchema);
export default UserBookReview;
  