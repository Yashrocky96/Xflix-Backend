const mongoose = require("mongoose");
const Joi = require("joi");

const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const genresCheck = (value, helpers) => {
  const validGenres = [
    "Education",
    "Sports",
    "Movies",
    "Comedy",
    "Lifestyle",
    "All",
  ];

  separatedGenres = value.split(",");

  for (genre of separatedGenres) {
    if (!validGenres.includes(genre)) {
      return helpers.message(
        '"{{#label}}" must be one of ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"]'
      );
    }
  }

  return value;
};

const validVideoId = {
  params: Joi.object().keys({
    videoid: Joi.string().custom(objectId),
  }),
};

const getVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    genres: Joi.string().custom(genresCheck),
    sortBy: Joi.string().valid("releaseDate", "viewCount"),
    contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+"),
  }),
};

const uploadVideo = {
  body: Joi.object().keys({
    videoLink: Joi.string().required(),
    title: Joi.string().required(),
    genre: Joi.string().custom(genresCheck),
    contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+"),
    releaseDate: Joi.date().required(),
    previewImage: Joi.string().uri(),
  }),
};

module.exports = {
  validVideoId,
  getVideos,
  uploadVideo,
};
