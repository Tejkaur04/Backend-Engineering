const express = require("express"); //require se node modules se fetch hoga
const User = require("../models/user.model");
const {createUser , updateUser ,deleteUser} = require("../controller/user.controller.js");
const router = express.Router();//express se router function ko extract kiya hai

router.post("/user/create",createUser);

router.put("/user/update/:id",updateUser);

router.delete("/user/:id/delete",deleteUser);

module.exports = router;
