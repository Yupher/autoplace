const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { promisify } = require("util");

const axios = require("axios");

const { OAuth2Client } = require("google-auth-library");
const messagebird = require("messagebird")("JG8a7XUMawHZXjLcHhkr5AmWO");

// send email

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, number: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60,
    },
  );
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user);

  req.universalCookies.set("jwt", token, {
    path: "/authentication",
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100000,
    ),
  });

  // Remove password from output
  user.password = undefined;
  user.codeConfirmation = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  let { firstname, lastname, email, password, passwordConfirm } = req.body;
  let codeConfirmation = 10000 + Math.floor(Math.random() * 90000);
  let data = {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
    codeConfirmation,
    confirmed: false,
  };

  const newUser = await User.create(data);

  const context = { firstname, lastname, code: codeConfirmation };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bettershop.wdz@gmail.com", // TODO: your gmail account
      pass: "betterMailDevloper1234", // TODO: your gmail password
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: "handle-handlebars",
      viewPath: "./",
    }),
  );

  let mailOptions = {
    from: "bettershop.wdz@gmail.com", // TODO: email sender
    // to: email, // TODO: email receiver
    to: "nasereddinebekkal@gmail.com",
    subject: "IA SHOP - Register",
    text: "Confirm your email",
    template: "handle",
    context,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent!!!");
  });

  createSendToken(newUser, 201, req, res);
});

exports.signupPhone = catchAsync(async (req, res, next) => {
  let { firstname, lastname, number, password, passwordConfirm } = req.body;
  let codeConfirmation = 10000 + Math.floor(Math.random() * 90000);
  let data = {
    firstname,
    lastname,
    number,
    password,
    passwordConfirm,
    codeConfirmation,
    confirmed: false,
  };

  var params = {
    originator: "TestMessage",
    recipients: [`+213550496442`],
    body: `${codeConfirmation} is your COMRCI verification code for register.`,
  };

  messagebird.messages.create(params, (err, response) => {
    if (err) {
      console.log(err);
      return next(
        new AppError("We have an error in our system,try again later!", 400),
      );
    }
  });

  const newUser = await User.create(data);
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  let user;

  if (email.includes("@")) {
    user = await User.findOne({ email }).select("+password");
  } else {
    user = await User.findOne({ number: email }).select("+password");
  }

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});
exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  let user;

  if (email.includes("@")) {
    user = await User.findOne({ email }).select("+password");
  } else {
    user = await User.findOne({ number: email }).select("+password");
  }

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  if (user.role !== "admin" && user.role !== "main_admin") {
    return next(new AppError("Forbidden!", 403));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.googleLogin = catchAsync(async (req, res, next) => {
  const client = new OAuth2Client(
    "578851431481-pfijho39klfn47r3rb0bta731qaqgsb5.apps.googleusercontent.com",
  );

  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience:
      "578851431481-pfijho39klfn47r3rb0bta731qaqgsb5.apps.googleusercontent.com",
  });

  const payload = ticket.getPayload();
  const userid = payload["sub"];

  if (userid !== req.body.id) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    let { firstname, lastname, email, password, passwordConfirm, photo } =
      req.body;
    let data = {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
      photo,
      confirmed: true,
    };

    const newUser = await User.create(data);

    createSendToken(newUser, 201, req, res);
  } else {
    let { firstname, lastname, photo } = req.body;
    let data = { firstname, lastname, photo };

    const updatedUser = await User.findByIdAndUpdate(user._id, data, {
      new: true,
      runValidators: true,
    });

    createSendToken(updatedUser, 200, req, res);
  }
});

exports.facebookLogin = catchAsync(async (req, res, next) => {
  let res1 = await axios.get(
    "https://graph.facebook.com/oauth/access_token?client_id=2732217483740418&client_secret=abca20db8b29d0e1a02c15c8ee9cc587&grant_type=client_credentials",
  );
  let get1 = res1.data.access_token;
  let res2 = await axios.get(
    `https://graph.facebook.com/debug_token?input_token=${get1}&access_token=${req.body.token}`,
  );
  let status = res2.data.data.is_valid;

  if (!status) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  const user = await User.findOne({ facebook: req.body.facebook });

  if (!user) {
    let { firstname, lastname, facebook, password, passwordConfirm, photo } =
      req.body;
    let data = {
      firstname,
      lastname,
      facebook,
      password,
      passwordConfirm,
      photo,
      confirmed: true,
    };

    const newUser = await User.create(data);

    createSendToken(newUser, 201, req, res);
  } else {
    let { firstname, lastname, photo } = req.body;
    let data = { firstname, lastname, photo };

    const updatedUser = await User.findByIdAndUpdate(user._id, data, {
      new: true,
      runValidators: true,
    });

    createSendToken(updatedUser, 200, req, res);
  }
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.loadUser = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  res.status(200).json({
    status: "success",
    user: currentUser,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
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

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
    .select("+role")
    .select("+password");

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

exports.isPermitted = (Model) =>
  catchAsync(async (req, res, next) => {
    const currentDoc = await Model.findById(req.params.id);

    if (
      currentDoc &&
      currentDoc.addedBy &&
      req.user._id.toString() !== currentDoc.addedBy._id.toString()
    ) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  });

exports.isAdmin = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "main_admin") {
    return next(
      new AppError("You do not have permission to perform this action.", 403),
    );
  }

  next();
});

exports.isMainAdmin = catchAsync(async (req, res, next) => {
  if (req.user.role !== "main_admin") {
    return next(
      new AppError("You do not have permission to perform this action.", 403),
    );
  }

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };
};

exports.resendEmail = catchAsync(async (req, res, next) => {
  if (!req.user.email || req.user.confirmed) {
    return next(new AppError(`Sorry! You can't use this service.`, 401));
  }

  let codeConfirmation = 10000 + Math.floor(Math.random() * 90000);
  let firstname = req.user.firstname;
  let lastname = req.user.lastname;

  const context = { firstname, lastname, code: codeConfirmation };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bettershop.wdz@gmail.com", // TODO: your gmail account
      pass: "betterMailDevloper1234", // TODO: your gmail password
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: "handle-handlebars",
      viewPath: "./",
    }),
  );

  let mailOptions = {
    from: "bettershop.wdz@gmail.com", // TODO: email sender
    // to: email, // TODO: email receiver
    to: "nasereddinebekkal@gmail.com",
    subject: "IA SHOP - Register",
    text: "Confirm your email",
    template: "handle",
    context,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent!!!");
  });

  await User.findByIdAndUpdate(
    req.user._id,
    { codeConfirmation },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
  });
});

exports.confirmEmail = catchAsync(async (req, res, next) => {
  if (!req.user.email || req.user.confirmed) {
    return next(new AppError(`Sorry! You can't use this service.`, 401));
  }

  const user = await User.findOne({ email: req.user.email }).select(
    "+codeConfirmation",
  );

  if (user.codeConfirmation !== req.body.code) {
    return next(
      new AppError("Your code is wrong! Please try another code.", 401),
    );
  }

  await User.findByIdAndUpdate(
    req.user._id,
    { confirmed: true },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    user: user,
  });
});

exports.resendPhone = catchAsync(async (req, res, next) => {
  if (!req.user.number || req.user.confirmed) {
    return next(new AppError(`Sorry! You can't use this service.`, 401));
  }

  let codeConfirmation = 10000 + Math.floor(Math.random() * 90000);

  var params = {
    originator: "TestMessage",
    recipients: [`+213550496442`],
    body: `${codeConfirmation} is your COMRCI verification code for register.`,
  };

  messagebird.messages.create(params, (err, response) => {
    if (err) {
      console.log(err);
      return next(
        new AppError("We have an error in our system,try again later!", 400),
      );
    }
  });

  await User.findByIdAndUpdate(
    req.user._id,
    { codeConfirmation },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
  });
});

exports.confirmPhone = catchAsync(async (req, res, next) => {
  if (!req.user.number || req.user.confirmed) {
    return next(new AppError(`Sorry! You can't use this service.`, 401));
  }

  const user = await User.findOne({ number: req.user.number }).select(
    "+codeConfirmation",
  );

  if (user.codeConfirmation !== req.body.code) {
    return next(
      new AppError("Your code is wrong! Please try another code.", 401),
    );
  }

  await User.findByIdAndUpdate(
    req.user._id,
    { confirmed: true },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    user: user,
  });
});
