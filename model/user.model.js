const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    wallet: {
        type: String,
        default : 5000
    }
}, {
    timestamps: true
}, {
    collection: 'user'
});


userSchema.methods.userGenerateAuthtoken = async function (res) {
    try {
        const generateToken = jwt.sign({ _id: this._id.toString() }, process.env.USER_AUTH_TOKEN)
        this.token = generateToken
        return generateToken;
    }
    catch (error) {
        console.log('::ERROR_MODEL::', error);
        res.status(403).json({
            message: "TOKEN NOT GENERATE",
            status: 403
        })
    }
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("user", userSchema);