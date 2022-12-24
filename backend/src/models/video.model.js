const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  videoLink: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"],
    default: "All",
  },
  contentRating: {
    type: String,
    required: true,
    enum: ["Anyone", "7+", "12+", "16+", "18+"],
    default: "Anyone",
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  previewImage: {
    type: String,
    required: true,
  },
  votes: {
    type: {
      upVotes: Number,
      downVotes: Number,
    },
    default: {
      upVotes: 0,
      downVotes: 0,
    },
    _id: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = {
  Video,
};
