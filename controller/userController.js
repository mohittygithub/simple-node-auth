import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register
export const register = async (req, res, next) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ error: "User exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    isActive: true,
    isAdmin: isAdmin ? isAdmin : false,
  });
  await newUser.save();
  newUser.password = null;

  const users = [newUser];

  return res.json(users);
};

// login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Invalid request" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Incorrect email or password" });

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched)
      return res.status(400).json({ error: "Incorrect email or password" });

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
  }
};

// find all users
export const findAll = async (req, res, next) => {
  const users = await User.find({}).select("-password");
  res.status(200).json(users);
};

// get logged in user details
export const loggedInUser = (req, res, next) => {
  res.status(200).json(req.user);
};
