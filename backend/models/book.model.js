import mongoose from "mongoose";

const { Schema } = mongoose;

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
    },

    AuthorDescription: {
      type: Schema.Types.Mixed, // Allows saving text as either a plain string or a Paragraph Array
      default: "No biography details available for this author."
    },
    AuthorPhoto: {
      type: String,
      default: "https://placehold.co/150x150?text=No+Avatar"
    }
})


const BookInfo = mongoose.model("BookInfo", BookInfoSchema);
export default BookInfo;
