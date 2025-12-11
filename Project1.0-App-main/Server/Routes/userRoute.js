const express = require("express");
const router = express.Router();
const userModel = require("../Model/user");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

router.post("/signup", async (req, res) => {
  try {
    await userModel(req.body).save();
    res.status(201).send({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});


// Login route
router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.password !== req.body.password) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generateToken(user);
    return res.status(200).json({
      message: `Welcome ${user.role}`,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

// Delete user route (optional)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
   
    const id = req.params.id;
    const user = await userModel.findById(id).select('-password');
    res.send(user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const user = await userModel.find();
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = router;