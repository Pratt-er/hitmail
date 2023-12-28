const mongoose = require("mongoose");
const shortid = require("shortid");

const { Schema } = mongoose;

const commentSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
   
  },
  gender: {
    type: String, 
    enum: ['M', 'F', 'other'],
    default: 'M',

  },
  likes: {
    type: Number,
    default: 0,
  },
  // replies: [
  //   {
  //     text: {
  //       type: String,
  //       required: true,
  //     },
  //     author: {
  //       type: String,
  //       required: true,
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now,
  //     }
     
  //   },
  // ],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
