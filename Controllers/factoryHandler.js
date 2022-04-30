const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/APIFeatures");
const obgFiltring = require("../utils/obgFiltring");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
});

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });

exports.getOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model, params) =>
  catchAsync(async (req, res, next) => {
    if (params.user) {
      req.body.addedBy = req.user._id;
    }

    if (params.hasPhotos) {
      const { photos } = req.body;

      if (!photos || photos.length <= 0) {
        return next(new AppError("Photos are required.", 401));
      }
      let promises = [];
      photos.forEach((image) => {
        promises.push(
          cloudinary.uploader.upload(image, {
            folder: "autoplace-vehicle",
          }),
        );
      });

      const response = await Promise.all(promises);

      // cloudinary.uploader
      //   .upload("../car-svgrepo-com.svg", {
      //     folder: "testing",
      //   })
      //   .then((img) => console.log(img))
      //   .catch((e) => console.log(e));

      req.body.images = response;
    }

    const doc = await Model.create(req.body);

    return res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.updateOne = (Model, ...filtring) =>
  catchAsync(async (req, res, next) => {
    if (req.body && req.body.accepted) {
      return next(new AppError("Forbidden.", 403));
    }

    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      obgFiltring(req.body, filtring),
      {
        new: true,
        runValidators: true,
      },
    );

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
