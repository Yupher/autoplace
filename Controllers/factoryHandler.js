const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/APIFeatures");
const obgFiltring = require("../utils/obgFiltring");
const { promisify } = require("util");
const User = require("../Models/userModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
});

const jwt = require("jsonwebtoken");
const { Promise } = require("mongoose");

exports.getAll = (Model, params) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const allDocs = await features.query;

    let doc = allDocs;

    if (params && params.accept) {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
      } else {
        token = req.body.token;
      }

      const decoded =
        token && (await promisify(jwt.verify)(token, process.env.JWT_SECRET));

      const currentUser =
        decoded &&
        (await User.findById(decoded.id).select("+role").select("+password"));

      if (
        currentUser &&
        (currentUser.role === "main_admin" || currentUser.role === "admin")
      ) {
        doc = [...allDocs];
      } else {
        doc = [
          ...allDocs.filter(
            (obj) => obj.accepted && obj.accepted.value === true,
          ),
        ];
      }
    }

    // SEND RESPONSE
    return res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });

exports.getOne = (model, params) =>
  catchAsync(async (req, res, next) => {
    const document = await model.findById(req.params.id);

    if (!document) {
      return next(new AppError("No document found with that ID", 404));
    }

    let doc = document;

    if (params && params.accept) {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
      } else {
        token = req.body.token;
      }

      const decoded =
        token && (await promisify(jwt.verify)(token, process.env.JWT_SECRET));

      const currentUser =
        decoded &&
        (await User.findById(decoded.id).select("+role").select("+password"));

      if (
        currentUser &&
        (currentUser.role === "main_admin" ||
          currentUser.role === "admin" ||
          currentUser._id.toString() === document.addedBy._id.toString())
      ) {
        doc = document;
      } else if (document.accepted && document.accepted.value === true) {
        doc = document;
      }
    }

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      token = req.body.token;
    }

    const decoded =
      token && (await promisify(jwt.verify)(token, process.env.JWT_SECRET));

    const currentUser =
      decoded &&
      (await User.findById(decoded.id).select("+role").select("+password"));

    if (
      currentUser &&
      (currentUser.role === "main_admin" ||
        currentUser.role === "admin" ||
        currentUser._id.toString() === document.addedBy._id.toString())
    ) {
      doc = document;
    } else if (document.accepted && document.accepted.value === true) {
      doc = document;
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

    if (params && params.hasPhotos) {
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

exports.updateOne = (Model, params, ...filtring) =>
  catchAsync(async (req, res, next) => {
    if (req.body && req.body.accepted) {
      return next(new AppError("Forbidden.", 403));
    }

    if (params && params.hasPhotos) {
      const { photos } = req.body;
      let prod = await Model.findById(req.params.id);

      if (!prod) {
        return next(new AppError("Something went wrong.", 500));
      }

      if (!photos || photos.length <= 0) {
        return next(new AppError("Photos are required.", 401));
      }

      let promises = [];
      let promisesDelete = [];
      for (let i = 0; i < prod.images.length; i++) {
        for (let j = 0; j < photos.length; j++) {
          if (prod.images[i].secure_url !== photos[j]) {
            promisesDelete.push(
              cloudinary.uploader.destroy(prod.images[i].public_id),
            );
            promises.push(
              cloudinary.uploader.upload(photos[j], {
                folder: "autoplace-vehicle",
              }),
            );
          }
        }
      }
      // photos.forEach((image) => {
      //   promises.push(
      //     cloudinary.uploader.upload(image, {
      //       folder: "autoplace-vehicle",
      //     }),
      //   );
      // });

      await Promise.all(promisesDelete);
      const response = await Promise.all(promises);

      // console.log(response);

      req.body.images = response;
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.deleteOne = (Model, params) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (params && params.hasPhotos) {
      let promises = [];
      doc.images.forEach((image) => {
        promises.push(cloudinary.uploader.destroy(image.public_id));
      });
      await Promise.all(promises);
    }

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
