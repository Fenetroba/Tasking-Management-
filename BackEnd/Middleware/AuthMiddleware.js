import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_Token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access", success: false });
  }

  jwt.verify(token, process.env.ACSSESS_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return res.status(err.name === "TokenExpiredError" ? 401 : 403).json({
        message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
        success: false,
      });
    }

    req.user = decoded; 

    next();
  });
};

export default authMiddleware; 