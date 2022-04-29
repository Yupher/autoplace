const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const model = require("./../Models/prodAutoModel");
const factory = require("./factoryHandler");

exports.getAllDocuments = factory.getAll(model);

exports.getDocument = factory.getOne(model);

exports.createDocument = factory.createOne(model, {
  user: true,
  hasPhotos: true,
});

exports.updateDocument = factory.updateOne(model, "name", "desc", "slug");

exports.deleteDocument = factory.deleteOne(model);

exports.accept = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const product = await model.findByIdAndUpdate(
    productId,
    {
      "accepted.value": true,
      "accepted.acceptedAt": Date.now(),
      "accepted.acceptedBy": req.user._id,
    },
    { new: true, runValidators: true },
  );
  if (!product) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.reject = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const product = await model.findByIdAndUpdate(
    productId,
    {
      "accepted.value": false,
      "accepted.acceptedAt": Date.now(),
      "accepted.acceptedBy": req.user._id,
    },
    { new: true, runValidators: true },
  );
  if (!product) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});
