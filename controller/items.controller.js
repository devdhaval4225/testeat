const Item = require("../model/item.model");
const cloudinary = require("../utils/cloudinary.util");
const fs = require('fs');


exports.insert = async (req, res) => {
    try {

        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let uniStr = "";
        for (let i = 0; i <= 1; i++) {
            const nCode = Math.floor(Math.random() * 26);
            uniStr += chars[nCode];
        }
        const uniNumber = Math.floor(Math.random() * 100);
        const subTitle = req.body.subTitle;
        const price = Number(req.body.price);
        const checkPrice = Number.isInteger(price);

        if (subTitle.length >= 30) {
            if (checkPrice == true) {

                /* For Image Uploading Code */
                let images = req.files;
                const cloudinaryImageUploadMethod = async file => {
                    return new Promise(resolve => {
                        cloudinary.uploader.upload(file, (err, res) => {
                            if (err) return err
                            resolve({
                                res: res.secure_url
                            })
                        }
                        )
                    })
                }
                const urls = [];
                for (const img of images) {
                    const { path } = img
                    const newPathData = await cloudinaryImageUploadMethod(path)
                    urls.push(newPathData);
                    fs.unlinkSync(path);
                }
                /* End */

                const insertData = new Item({
                    uniqueId: uniStr + uniNumber,
                    name: req.body.name,
                    image: urls,
                    subTitle: subTitle,
                    desc: req.body.desc,
                    price: price,
                    tags: "#" + req.body.tags
                });
                const saveData = await insertData.save();
                res.status(201).json({
                    message: "item insert successfully",
                    status: 201,
                    data: saveData
                })

            } else {
                res.status(404).json({
                    message: "not a number",
                    status: 404
                })
            }

        } else {
            res.status(401).json({
                message: "Title length must be 30 charecter",
                status: 401
            })
        }

    } catch (error) {
        console.log("::insert-item-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.update = async (req, res) => {
    try {
        const uniqueId = req.params.uniqueId;
        const subTitle = req.body.subTitle;
        const price = Number(req.body.price);
        const checkPrice = Number.isInteger(price);

        if (subTitle.length >= 30) {
            if (checkPrice == true) {

                /* For Image Uploading Code */
                let images = req.files;
                const cloudinaryImageUploadMethod = async file => {
                    return new Promise(resolve => {
                        cloudinary.uploader.upload(file, (err, res) => {
                            if (err) return err
                            resolve({
                                res: res.secure_url
                            })
                        }
                        )
                    })
                }
                const urls = []
                for (const img of images) {
                    const { path } = img
                    const newPathData = await cloudinaryImageUploadMethod(path)
                    urls.push(newPathData);
                    fs.unlinkSync(path);
                }
                /* End */

                const updateData = await Item.findOneAndUpdate(
                    {
                        uniqueId: uniqueId
                    },
                    {
                        name: req.body.name,
                        image: urls,
                        subTitle: subTitle,
                        desc: req.body.desc,
                        price: parseInt(price),
                        tags: "#" + req.body.tags
                    },
                    {
                        new: true
                    })

                res.status(200).json({
                    message: "update item sucessfully",
                    status: 200,
                    data: updateData
                })
            } else {
                res.status(404).json({
                    message: "not a number",
                    status: 404
                })
            }

        } else {
            res.status(401).json({
                message: "Title length must be 30 charecter",
                status: 401
            })
        }

    } catch (error) {
        console.log("::upadte-item-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.list = async (req, res) => {
    try {
        const { page, limit } = req.query;
        if (!page) page = 1;
        if (!limit) limit = 5;

        const skip = (page - 1) * 5;
        const items = await Item.find().skip(skip).limit(limit);

        res.status(200).json({
            message: "Show List",
            status: 200,
            data: items
        })
    } catch (error) {
        console.log("::list-item-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.one = async (req, res) => {
    try {
        const findData = await Item.findOne({ uniqueId: req.params.uniqueId })
        console.log("::findData::", findData);

        res.status(200).json({
            message: "item",
            status: 200,
            data: findData
        })

    } catch (error) {
        console.log("::one-item-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}



