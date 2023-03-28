const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
}, {
    collection: 'admin'
});


adminSchema.methods.adminGenerateAuthtoken = async function (res) {
    try {
        const generateToken = jwt.sign({ _id: this._id.toString() }, process.env.ADMIN_AUTH_TOKEN)
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



module.exports = mongoose.model("admin", adminSchema);