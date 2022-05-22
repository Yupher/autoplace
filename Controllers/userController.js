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
  if (!req.body.email && !req.body.phone) {
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

  if (!current.confirmed) {
    return next(new AppError("Please confirm your email first.", 404));
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
  let { id } = req.body;

  if (id.toString() === req.user._id.toString()) {
    return next(
      new AppError(
        "You can not block yourself please ask main admin to block you.",
        404,
      ),
    );
  }

  const currentUser = await User.findById(id);

  if (!currentUser) {
    return next(
      new AppError("We cannot find this user, please give us a valid ID.", 404),
    );
  }

  if (currentUser.role === "main_admin") {
    return next(new AppError("You do not have previlege.", 403));
  }

  if (currentUser.role === "admin" && req.user.role !== "main_admin") {
    return next(new AppError("Only main admin can block an admin.", 403));
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { active: false },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.unblockUser = catchAsync(async (req, res, next) => {
  let { id } = req.body;

  if (id.toString() === req.user._id.toString()) {
    return next(
      new AppError(
        "You can not unblock yourself please ask main admin to block you.",
        404,
      ),
    );
  }

  const currentUser = await User.findById(id);

  if (!currentUser) {
    return next(
      new AppError("We cannot find this user, please give us a valid ID.", 404),
    );
  }

  if (currentUser.role === "main_admin") {
    return next(new AppError("You do not have previlege.", 403));
  }

  if (currentUser.role === "admin" && req.user.role !== "main_admin") {
    return next(new AppError("Only main admin can unblock an admin.", 403));
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { active: true },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});
