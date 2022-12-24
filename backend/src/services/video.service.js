const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getAllVideos = async () => {
  try {
    const result = await Video.find({});
    return result;
  } catch (error) {
    throw error;
  }
};

const getVideoById = async (id) => {
  const video = await Video.findById(id);

  if (!video)
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");

  return video;
};

const uploadVideo = async (video) => {
  // try catch wrapper required to handle the case when the video exists already?
  // Or maybe model needs to have unique value for the videoLink
  return await Video.create(video);
};

const updateVote = async (videoId, vote, change) => {
  const video = await getVideoById(videoId);

  vote = `${vote}s`;

  if (change == "increase") video.votes[vote]++;
  if (change == "decrease") video.votes[vote]--;

  if (video.votes[vote] < 0) video.votes[vote] = 0;

  video.save();
};

const updateViewCount = async (videoId) => {
  const video = await getVideoById(videoId);

  video.viewCount++;
  video.save();
};

module.exports = {
  getAllVideos,
  getVideoById,
  uploadVideo,
  updateVote,
  updateViewCount,
};
