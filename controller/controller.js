const Comment = require("../models/comment");



const postComment = async (req, res) => {
  const { name, text, gender, customDate } = req.body; // Add customDate field

  try {
    let commentDate = Date.now(); // Default to current date if customDate is not provided
    if (customDate) {
      // If customDate is provided, parse it to set the comment date
      commentDate = new Date(customDate);
    }

    const newComment = new Comment({ name, text, gender, date: commentDate });
    const savedComment = await newComment.save();
    res.redirect(`/?savedComment=${savedComment._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  const getComment = async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments); // Respond with JSON data
    } catch (err) {
      res.status(500).json({ error: 'Error fetching comments' });
    }
  };
  
  // const postReply = async (req, res) => {
  //   const { commentId } = req.params;
  //   const { author, text } = req.body;
  
  //   try {
  //     // Find the comment to which the reply is being posted
  //     const comment = await Comment.findById(commentId);
  
  //     if (!comment) {
  //       return res.status(404).json({ message: 'Comment not found' });
  //     }
  
  //     // Add the reply to the comment's replies array
  //     comment.replies.push({ author, text });
  //     await comment.save();
  
  //     res.status(201).json(comment.replies);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
  
// Update a comment by ID
const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postComment,
  getComment,
  updateComment,
  deleteComment
  
};

