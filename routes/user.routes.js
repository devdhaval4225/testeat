const router = require("express").Router();
const { verifyUser } = require("../middleware/user.auth")

const {
    register,
    login,
    me
} = require("../controller/user.controller");


router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyUser, me);




module.exports = router;