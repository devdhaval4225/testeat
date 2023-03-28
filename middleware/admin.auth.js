require("dotenv").config();
const jwt = require("jsonwebtoken");
const admin = require("../model/admin.model");

exports.verifyAdmin = async (req, res, next) => {
    try {

        const Token = req.headers.authorization;
        if (Token) {

            const decoded = jwt.verify(Token, process.env.ADMIN_AUTH_TOKEN);
            const data = await admin.findById({ _id: decoded._id });

            if (data) {

                req.admin = data;
                if (Token == data.token) {
                    next();
                }
                else {
                    res.status(401).json({
                        message: "UNAUTHORIZED",
                        status: 401
                    })
                }

            }
            else {

                res.status(404).json({
                    message: "DATA NOT FOUND!",
                    status: 404
                })

            }
        } else {

            res.status(403).json({
                message: "FORBIDEN",
                status: 403
            })

        }
    } catch (error) {

        console.log("ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })

    }
}

