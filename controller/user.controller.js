const User = require("../model/user.model");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
    try {
        const uniqueId = Math.floor(Math.random() * 1000000);
        const { email, password } = req.body;
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail == null) {
            if (password.length >= 6) {
                const insertUser = new User({
                    uniqueId: uniqueId,
                    username: req.body.username,
                    email: email,
                    password: password,
                    mobile: req.body.mobile
                })
                const token = await insertUser.userGenerateAuthtoken();
                const saveDate = await insertUser.save();
                res.status(201).json({
                    message: "USER REGISTER SUCCESSFULLY",
                    status: 201,
                    data: saveDate
                })
            } else {
                res.status(401).json({
                    message: "password must be 6 digit",
                    status: 401
                })
            }
        } else {
            res.status(401).json({
                message: "email is already exitst",
                status: 401
            })
        }

    } catch (error) {
        console.log("::register-user-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail == null) {
            res.status(401).json({
                message: "email is not valid",
                status: 401
            })
        } else {
            const checkPass = await bcrypt.compare(password, checkEmail.password);
            if (checkPass == true) {
                res.status(200).json({
                    message: "login successfully",
                    status: 200,
                    data : checkEmail
                })
            } else {
                res.status(401).json({
                    message: "password not match",
                    status: 401
                })
            }
        }
    } catch (error) {
        console.log("::login-user-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.me = async (req, res) => {
    try {
        const userData = req.user

        res.status(200).json({
            message: "show user data",
            status: 200,
            data: userData
        })
    } catch (error) {
        console.log("::me-user-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}