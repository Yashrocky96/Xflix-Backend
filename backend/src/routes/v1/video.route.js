const express = require("express");
const validate = require("../../middlewares/validate");
const videoValidation = require("./../../validations/video.validation");
const videoController = require("../../controllers/video.controller");

const router = express.Router();

// GET /v1/videos
router.get("/", validate(videoValidation.getVideos), videoController.getVideos);

// GET /v1/videos/:videoId
router.get(
  "/:videoid",
  validate(videoValidation.validVideoId),
  videoController.getVideoById
);

// POST /v1/videos
router.post(
  "/",
  validate(videoValidation.uploadVideo),
  videoController.uploadVideo
);

// PATCH /v1/videos/:videoId/votes
router.patch(
  "/:videoid/votes",
  validate(videoValidation.validVideoId),
  videoController.updateVote
);

// PATCH /v1/videos/:videoId/views
router.patch(
  "/:videoid/views",
  validate(videoValidation.validVideoId),
  videoController.updateViewCount
);

module.exports = router;
