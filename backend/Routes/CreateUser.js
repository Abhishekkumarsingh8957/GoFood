const express = require("express");
const router = express.Router();
const user = require("../model/user");
const jwt=require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const jwtSecret="GoFoodApp"
const { body, validationResult } = require("express-validator");
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array(), success: false });
    }
    const salt = await bcryptjs.genSalt(10);
    let setPassword = await bcryptjs.hash(req.body.password, salt);
    try {
      const email = req.body.email;
      const User = await user.findOne({ email });
      if (User) {
        return res.status(404).json({ errors: err.array(), success: false });
      } else {
        await user.create({
          name: req.body.name,
          location: req.body.location,
          email: req.body.email,
          password: setPassword,
        });
        res.status(200).json({ success: true });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array(), success: false });
    }
    const email = req.body.email;
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({ errors: err.array(), success: false });
    } else {
      const compare = await bcryptjs.compare(req.body.password, User.password);
      if (compare) {
        const data={
          user:{
            id:User.id
          }
        }

        const authToken=jwt.sign(data,jwtSecret);
        return res.status(200).json({ success: true ,authToken:authToken});
      } else {
        return res.status(400).json({ success: false });
      }
    }
  }
);

module.exports = router;
