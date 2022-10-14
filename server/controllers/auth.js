import User from "../models/Users.js";
import Roles from "../models/Roles.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//register user
export const register = async (req, res) => {
  try {
    const { email, password, name, avatarURL, status } = req.body;

    const isUsed = await User.findOne({ email });

    if (isUsed) {
      return res.json({
        message: "User with this email already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const userRole = await Roles.findOne({ role: "User" });

    const newUser = new User({
      email,
      password: hash,
      name,
      role: [userRole.role],
      avatarURL,
      status,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    //insert in DB
    await newUser.save();

    //send respond to frontend
    return res.json({
      newUser,
      token,
      message: "User is registered",
    });
    // res.json({message: "OK"})
  } catch (error) {
    res.json({ message: "User registration error" });
  }
};

//Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Such email was not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "You are logged in",
    });
  } catch (error) {
    res.json({ message: "Error while authorising a user" });
  }
};

// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Such user doesn't exist",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ message: "No access" });
  }
};

//Get users

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: "Something going wrong" });
  }
};

// // delete User
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await Users.findByIdAndDelete(req.params.id);
//     if (!user) return res.json({ message: "the user does not exist" });

//     await Users.findByIdAndUpdate(req.userId, {
//       $pull: { users: req.params.id },
//     });

//     res.json({ message: "User has been deleted" });
//   } catch (error) {
//     res.json({ message: "Error delete user" });
//   }
// };

// Update user
export const updateUser = async (req, res) => {
  try {
    const { role, status, id } = req.body;
    const user = await User.findById(req.params.id);
    user.role = role;
    user.status = status;

    await user.save();

    res.json(user);
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};
