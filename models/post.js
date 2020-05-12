const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  },
  pictureUrl: {
    type: String
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
