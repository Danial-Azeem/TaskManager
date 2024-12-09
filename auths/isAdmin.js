import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const role = decodedToken.role;
  try {
    if (role === "admin") {
      next();
    } else {
      res.status(401).json({ message: "User is not authenticated." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
