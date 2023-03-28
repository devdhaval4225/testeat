const Admin = require("../model/admin.model");


exports.login = async (req, res) => {
    try {
        const { email, username } = req.body;
        const checkEmail = await Admin.findOne({ email: email });

        if (checkEmail == null) {
            res.status(401).json({
                message: "DATA NOT FOUND",
                status: 401
            })
        } else {
            if (username == checkEmail.username) {
                const token = await checkEmail.adminGenerateAuthtoken();

                const updateData = await Admin.updateOne({
                    email: email
                }, {
                    token: token
                }, {
                    new: true
                })

                const response = {
                    token: token
                }
                res.status(200).json({
                    message: "ADMIN DATA UPDATE",
                    status: 200,
                    data: token
                })
            } else {
                res.status(401).json({
                    message: "ENTER VALID USERNAME",
                    status: 401
                })
            }
        }
    } catch (error) {
        console.log("::login-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}