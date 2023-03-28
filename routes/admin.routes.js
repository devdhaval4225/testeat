const router = require("express").Router();

const {
    login
} = require("../controller/admin.controller");

router.post("/login", login);



module.exports = router;