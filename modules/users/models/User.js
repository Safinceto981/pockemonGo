const mongoose = require('mongoose');
// const crypto = require('crypto');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'PLease enter a username'],
        minLength: 3,
        maxLength: 20,
        unique: true
    },
    email: {
        type: String,
        minLength: 5,
        maxLength: 40,
        unique: true,
        require: [true, 'Please enter an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]

    },
    password: {
        type: String,
        minLength: 6,
        require: [true, 'Please enter a password']
    },
    gameId: {
        type: Number,
        length: 12,
        require: [true, 'Please enter gameId'],
        unique: true
    },
    findFriends: {
        type: Boolean

    },
    location: [{
        type: String,
        name: 'Bulgaria'
            // city: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'StaraZagora', 'VelikoTurnovo', 'Vidin', 'Silistra', 'Haskovo']
    }, {
        type: String,
        name: 'Serbia'
            // city: ['Belgrade', 'Bor', 'Kraljevo', 'NoviPazar', 'NoviSad', 'Nis']


    }],
    level: {
        type: Number,
        require: [true, 'Please enter your level']
    }

});

// // Encrypt password
// UserSchema.pre("save", async function(next) {
//     if (!this.isModified("password")) {
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });
// // JWT
// UserSchema.methods.getSignedJwtToken = function() {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// };
// // Match user password to hashed password
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };
// // Generate and hash password token
// UserSchema.methods.getResetPasswordToken = function() {
//     // Generate token
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     // Expire
//     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//     return resetToken;
// };

module.exports = mongoose.model('User', UserSchema);