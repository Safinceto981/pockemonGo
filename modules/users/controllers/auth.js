// const crypto = require("crypto");
// const User = require('../models/User');

// // @desc      Register user
// // @route     POST /api/v1/auth/register
// // @access    Public
// exports.register = (async(req, res, next) => {
//     const { username, email, password, gameId, findFriends, location, level } = req.body;

//     // Create user

//     const user = await User.create({
//         username,
//         email,
//         password,
//         gameId,
//         findFriends,
//         location,
//         level,
//     });

//     sendTokenResponse(user, 200, res);
// });

// // @desc      Login user
// // @route     POST /api/v1/auth/login
// // @access    Public
// exports.login = (async(req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return next(("Validate email and password", 400));
//     }
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//         return next(("Invalid credentials", 401));
//     }

//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//         return next(("Invalid credentials", 401));
//     }

//     sendTokenResponse(user, 200, res);
// });

// // @desc      Log user out / clear cookie
// // @route     GET /api/v1/auth/logout
// // @access    Private
// exports.logout = (async(req, res, next) => {
//     res.cookie("token", "none", {
//         expires: new Date(Date.now() + 10 * 1000),
//         httpOnly: true
//     });

//     res.status(200).json({
//         success: true,
//         data: {}
//     });
// });

// // @desc      Get current logged in user
// // @route     POST /api/v1/auth/me
// // @access    Private
// exports.getMe = (async(req, res, next) => {
//     const user = await User.findById(req.user.id);

//     res.status(200).json({
//         success: true,
//         data: user
//     });
// });

// // @desc      Update user details
// // @route     PUT /api/v1/auth/updatedetails
// // @access    Private
// exports.updateDetails = (async(req, res, next) => {
//     const fieldsToUpdate = {
//         name: req.body.name
//     };

//     const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
//         new: true,
//         runValidators: true
//     });

//     res.status(200).json({
//         success: true,
//         data: user
//     });
// });

// // @desc      Update password
// // @route     PUT /api/v1/auth/updatepassword
// // @access    Private
// exports.updatePassword = (async(req, res, next) => {
//     const user = await User.findById(req.user.id).select("+password");

//     // Check current password
//     if (!(await user.matchPassword(req.body.currentPassword))) {
//         return next(("Password is incorrect", 401));
//     }

//     user.password = req.body.newPassword;
//     await user.save();

//     sendTokenResponse(user, 200, res);
// });

// // @desc      Forgot password
// // @route     POST /api/v1/auth/forgotpassword
// // @access    Public
// exports.forgotPassword = (async(req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//         return next(("There is no user with that email", 404));
//     }

//     // Get reset token
//     const resetToken = user.getResetPasswordToken();

//     await user.save({ validateBeforeSave: false });

//     // Create reset url
//     const resetUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/resetpassword/${resetToken}`;

//     const message = `Email for reset password: \n\n ${resetUrl}`;

//     try {
//         await sendEmail({
//             email: user.email,
//             subject: "Password reset token",
//             message
//         });

//         res.status(200).json({ success: true, data: "Email sent" });
//     } catch (err) {
//         console.log(err);
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         await user.save({ validateBeforeSave: false });

//         return next(("Email could not be sent", 500));
//     }
// });

// // @desc      Reset password
// // @route     PUT /api/v1/auth/resetpassword/:resettoken
// // @access    Public
// exports.resetPassword = (async(req, res, next) => {
//     // Get hashed token
//     const resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(req.params.resettoken)
//         .digest("hex");

//     const user = await User.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//         return next(("Invalid token", 400));
//     }

//     // Set new password
//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     sendTokenResponse(user, 200, res);
// });

// // Get token from model and create cookie
// const sendTokenResponse = (user, statusCode, res) => {
//     // Create token
//     const token = user.getSignedJwtToken();

//     const options = {
//         expires: new Date(
//             Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true
//     };



//     res
//         .status(statusCode)
//         .cookie("token", token, options)
//         .json({
//             success: true,
//             token
//         });
// };