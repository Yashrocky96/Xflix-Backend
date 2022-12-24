const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");

const getVideos = catchAsync(async (req, res) => {
  let videos = await videoService.getAllVideos();

  let { title, genres, contentRating, sortBy } = req.query;

  // This filtering was supposed to happen with mongo queries in case it's database grew to thousands of records
  // Below code will make this endpoint slower, V2 Version of this API will update this code :)

  if (title) {
    title = title.toLowerCase();

    videos = videos.filter((video) => {
      return video.title.toLowerCase().includes(title);
    });
  }

  if (genres) {
    genres = genres.toLowerCase().split(",");

    if (!genres.includes("all")) {
      videos = videos.filter((video) =>
        genres.includes(video.genre.toLowerCase())
      );
    }
  }

  if (contentRating) {
    contentRating = contentRating.toLowerCase();

    if (contentRating !== "anyone")
      videos = videos.filter((video) => {
        return (
          parseInt(video.contentRating.slice(0, -1)) >=
          parseInt(contentRating.slice(0, -1))
        );
      });
  }

  if (sortBy) {
    videos = videos.sort((a, b) => {
      return b[sortBy] - a[sortBy];
    });
  }

  res.json({ videos: videos });
});

const getVideoById = catchAsync(async (req, res) => {
  const video = await videoService.getVideoById(req.params.videoid);
  res.send(video);
});

const uploadVideo = catchAsync(async (req, res) => {
  const video = await videoService.uploadVideo(req.body);
  res.status(httpStatus.CREATED).send(video);
});

const updateVote = catchAsync(async (req, res) => {
  const videoId = req.params.videoid;
  const { vote, change } = req.body;

  await videoService.updateVote(videoId, vote, change);

  res.sendStatus(httpStatus.NO_CONTENT);
});

const updateViewCount = catchAsync(async (req, res) => {
  const videoId = req.params.videoid;

  await videoService.updateViewCount(videoId);

  res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
  getVideos,
  getVideoById,
  uploadVideo,
  updateVote,
  updateViewCount,
};
