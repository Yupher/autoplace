const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const model = require("./../Models/prodAutoModel");
const factory = require("./factoryHandler");
const wishlist = require("../Models/wishlistModel");
exports.getAllDocuments = factory.getAll(model);

exports.getDocument = factory.getOne(model);

exports.createDocument = factory.createOne(model, {
  user: true,
  hasPhotos: true,
});

exports.updateDocument = factory.updateOne(model, "name", "desc", "slug");

exports.deleteDocument = factory.deleteOne(model);

exports.getUserProduct = catchAsync(async (req, res, next) => {
  let doc = await model.find({ addedBy: req.user._id });
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
  });
});

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

exports.addRemoveFromwishlist = catchAsync(async (req, res, next) => {
  let Wishlist = await wishlist.findOne({ user: req.user._id });
  if (!Wishlist) {
    return next(new AppError("No document found with that ID", 404));
  }

  let prodIndx = Wishlist.products.indexOf(req.params.id);

  if (prodIndx === -1) {
    Wishlist.products.splice(0, 0, req.params.id);
  } else {
    Wishlist.products.splice(prodIndx, 1);
  }
  let result = await wishlist
    .findOneAndUpdate(
      { user: req.user._id },
      { products: [...Wishlist.products] },
      { new: true },
    )
    .populate("products")
    .exec();
  res.status(200).json({ success: true, data: result });
});

exports.getWishlist = catchAsync(async (req, res, next) => {
  let Wishlist = await wishlist
    .findOne({ user: req.user._id })
    .populate("products")
    .exec();
  if (!Wishlist) {
    Wishlist = new wishlist({
      user: req.user._id,
    });
    await Wishlist.save();
  }

  res.status(200).json({ success: true, data: Wishlist });
});
