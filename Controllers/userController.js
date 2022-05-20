const User = require("../Models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const bcrypt = require("bcryptjs");
const factory = require("./factoryHandler");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.addAdmin = catchAsync(async (req, res, next) => {
  if (!req.body.email && !req.body.number) {
    return next(new AppError("Please, Give us all informations.", 404));
  }

  if (req.body.role !== "admin" && req.body.role !== "main_admin") {
    return next(new AppError("Please, Give us a valid role.", 404));
  }

  const current = await User.findOne({ email: req.body.email });

  if (!current) {
    return next(
      new AppError("We cannot find this user, please give us a valid ID.", 404),
    );
  }

  if (current.role === "main_admin") {
    return next(
      new AppError(
        "Do not redo this operation, you risked deleting your account immediately.",
        404,
      ),
    );
  }

  let user;

  if (req.body.email) {
    user = await User.findOneAndUpdate(
      { email: req.body.email },
      { role: req.body.role },
      {
        new: true,
        runValidators: true,
      },
    );
  } else {
    user = await User.findOneAndUpdate(
      { number: req.body.number },
      { role: req.body.role },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  if (!user) {
    return next(
      new AppError(
        "We cannot find this user, please give us a valid email or number.",
        404,
      ),
    );
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const current = await User.findById(req.body.user);

  if (!current) {
    return next(
      new AppError("We cannot find this user, please give us a valid ID.", 404),
    );
  }

  if (current.role !== "admin") {
    return next(
      new AppError(
        "Do not redo this operation, you risked deleting your account immediately.",
        404,
      ),
    );
  }

  const user = await User.findByIdAndUpdate(
    req.body.user,
    { role: current.isFirst ? current.isFirst : "client" },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // let { firstname, lastname, email, photo } = req.body;
  //  let body = { firstname, lastname, email, photo };

  if (
    req.body &&
    (req.body.role ||
      req.body._id ||
      req.body.password ||
      req.body.passwordConfirm)
  ) {
    return next(
      new AppError(
        "Do not redo this operation, you risked deleting your account immediately.",
        403,
      ),
    );
  }

  if (req.body && req.body.photo) {
    const response = await cloudinary.uploader.upload(req.body.photo, {
      folder: "profile",
    });

    req.body.photo = response.secure_url;
  }

  // Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  let { password, passwordConfirm, passwordOld } = req.body;

  if (
    !password ||
    !passwordConfirm ||
    !passwordOld ||
    password !== passwordConfirm
  ) {
    return next(new AppError("Please, give us a correct password.", 404));
  }

  if (!(await bcrypt.compare(passwordOld, req.user.password))) {
    return next(
      new AppError(
        "You cannot do this operation, your password is incorrect.",
        404,
      ),
    );
  }

  password = await bcrypt.hash(password, 12);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    password,
    passwordConfirm,
  });

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

exports.blockUser = catchAsync(async (req, res, next) => {
  let { id, status } = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, { active: status });

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});
