import mongoose from "mongoose";

const BookInfoSchema = new mongoose.Schema({

    BookName:{
        type: String
    },
    AuthorName:{
        type: String
    },
    Description:{
        type: String
    },
    Image: { 
        type: String 
    },
    NumOfPages:{
        type: Number
    },
    PublicationDate:{
        type: Date
    },
    Language:{
        type: String,
        enum: ["English", "Filipino", "French", "Other"],
        default: "English"
    },
    AverageRating: {
    type: Number,
    default: 0
    },
    NumOfReviews: {
        type: Number,
        default: 0
    }
})


const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
export default BookInfo;
