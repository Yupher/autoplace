const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { promisify } = require("util");
const sendEmail = require("../config/mailer");

const axios = require("axios");
const qs = require("qs");

const { OAuth2Client } = require("google-auth-library");
const messagebird = require("messagebird")("JG8a7XUMawHZXjLcHhkr5AmWO");
const bcrypt = require("bcryptjs");
const { userInfo } = require("os");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, phone: user.email },
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

  const checkUser = await User.findOne({ email });

  if (checkUser) {
    return next(new AppError("User already exists please login!", 400));
  }

  if (!password) {
    return next(new AppError("Password is required!", 400));
  }

  if (password && password !== passwordConfirm) {
    return next(
      new AppError("Password and password confiramtion does not match!", 400),
    );
  }

  const newUser = await User.create(data);

  if (!newUser) {
    return next(
      new AppError("We have an error in our system,try again later!", 400),
    );
  }

  const context = { firstname, lastname, code: newUser.codeConfirmation };

  //send email

  sendEmail(email, context);

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

  if (!user.active) {
    return next(new AppError("Account disabled.", 401));
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
  const { code } = req.query;

  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };
  try {
    const response = await axios.post(url, qs.stringify(values), {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    if (response && response.data) {
      let { access_token, id_token } = response.data;

      const getUserInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      );
      // console.log(getUserInfo);

      let user;

      if (getUserInfo && getUserInfo.data) {
        const { id, email, verified_email, given_name, family_name, picture } =
          getUserInfo.data;
        user = await User.findOne({ googleId: id });

        if (!user) {
          user = await User.findOneAndUpdate(
            { email },
            { googleId: id },
            {
              new: true,
              runValidators: true,
            },
          );
          if (!user) {
            user = await User.create({
              googleId: id,
              firstname: family_name,
              lastname: given_name,
              confirmed: verified_email,
              photo: picture,
              email,
              codeConfirmation: 0001,
            });
          }
        }
      }
      const token = signToken(user);
      res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
});

exports.googleLoginAdmin = catchAsync(async (req, res, next) => {
  const { code } = req.query;

  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI_ADMIN,
    grant_type: "authorization_code",
  };
  try {
    const response = await axios.post(url, qs.stringify(values), {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    if (response && response.data) {
      let { access_token, id_token } = response.data;

      const getUserInfo = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      );
      // console.log(getUserInfo);

      let user;

      if (getUserInfo && getUserInfo.data) {
        const { id } = getUserInfo.data;
        user = await User.findOne({ googleId: id });

        if (!user) {
          return next(new AppError("User not found.", 404));
        }

        if (user.role !== "admin" && user.role !== "main_admin") {
          return next(new AppError("Forbidden.", 403));
        }
      }
      const token = signToken(user);
      res.redirect(`${process.env.FRONTEND_URL_ADMIN}/?token=${token}`);
    }
  } catch (error) {
    console.log(error.response.data.error);
  }
});

exports.facebookLogin = catchAsync(async (req, res, next) => {
  const { code } = req.query;
  const url = "https://graph.facebook.com/v6.0/oauth/access_token";
  const values = {
    code,
    client_id: process.env.FACEBOOK_CLIENT_ID,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
  };
  try {
    const response = await axios.get(`${url}?${qs.stringify(values)}`);
    let user;
    if (response && response.data) {
      const { access_token } = response.data;
      const userInfo = await axios.get(
        `https://graph.facebook.com/me?access_token=${access_token}&fields=id,first_name,last_name,email,picture`,
      );
      if (userInfo && userInfo.data) {
        let { id, first_name, last_name, email, picture } = userInfo.data;
        user = await User.findOne({ facebookId: id });
        if (!user) {
          user = await User.findOneAndUpdate(
            { email },
            { facebookId: id },
            {
              new: true,
              runValidators: true,
            },
          );
          if (!user) {
            user = await User.create({
              facebookId: id,
              firstname: first_name,
              lastname: last_name,
              confirmed: true,
              photo: picture.data.url,
              email,
              codeConfirmation: 0001,
            });
          }
        }
      }
    }
    const token = signToken(user);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  } catch (error) {
    console.log(error.response.data.error);
  }
});

exports.facebookLoginAdmin = catchAsync(async (req, res, next) => {
  const { code } = req.query;
  const url = "https://graph.facebook.com/v6.0/oauth/access_token";
  const values = {
    code,
    client_id: process.env.FACEBOOK_CLIENT_ID,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI_ADMIN,
  };
  try {
    const response = await axios.get(`${url}?${qs.stringify(values)}`);
    let user;
    if (response && response.data) {
      const { access_token } = response.data;
      const userInfo = await axios.get(
        `https://graph.facebook.com/me?access_token=${access_token}&fields=id,first_name,last_name,email,picture`,
      );
      if (userInfo && userInfo.data) {
        let { id } = userInfo.data;
        user = await User.findOne({ facebookId: id });
        if (!user) {
          return next(new AppError("User not found.", 404));
        }

        if (user.role !== "admin" && user.role !== "main_admin") {
          return next(new AppError("Forbidden.", 403));
        }
      }
    }
    const token = signToken(user);
    res.redirect(`${process.env.FRONTEND_URL_ADMIN}/?token=${token}`);
  } catch (error) {
    console.log(error.response.data.error);
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

  const { firstname, lastname, email } = req.user;

  const context = { firstname, lastname, code: codeConfirmation };

  sendEmail(email, context);

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

  if (parseInt(req.body.code) === NaN) {
    return next(new AppError(`This code is not valid.`, 401));
  }

  const user = await User.findOne({ email: req.user.email }).select(
    "+codeConfirmation",
  );

  if (!user) {
    return next(new AppError(`We  can not find user.`, 404));
  }

  if (user.codeConfirmation !== parseInt(req.body.code)) {
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

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  let codeConfirmation = 10000 + Math.floor(Math.random() * 90000);

  if (!email) {
    return next(new AppError("Email is required.", 401));
  }
  const user = await User.findOneAndUpdate(
    { email },
    { codeConfirmation },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!user) {
  }
  const { firstname, lastname } = user;

  const context = { firstname, lastname, code: codeConfirmation };

  sendEmail(email, context);
  res.status(200).json({ status: "success" });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  let { code, password, passwordConfirm } = req.body;

  if (!password && !passwordConfirm) {
    return next(new AppError("All field are required.", 401));
  }

  if (password !== passwordConfirm) {
    return next(
      new AppError(`Password and confirm password does not match.`, 401),
    );
  }

  password = await bcrypt.hash(password, 12);
  let user = await User.findOneAndUpdate(
    { codeConfirmation: code },
    { password, passwordConfirm },
  );
  if (!user) {
    return next(new AppError("The confirmaton code is wrong.", 404));
  }
  createSendToken(user, 200, req, res);
});
