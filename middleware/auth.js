import User from "../model/User.js";
import jsonwebtoken from "jsonwebtoken";

export const auth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const { userId } = jsonwebtoken.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(userId).select("-password");
      next();
    } catch (error) {
      res.status(400).json({ error: "unauthorized access" });
    }
  }

  if (!token) {
    res.status(401).json({ error: "No token" });
  }
};
