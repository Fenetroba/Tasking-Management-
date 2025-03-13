import userAuthdata from "../model/UserAuth.model.js";
import bycrypt from 'bcrypt'
import env from 'dotenv'
env.config()
import jwt from 'jsonwebtoken'

const SetToken = (UserIds,UserEmail,UserName) => {
  const refreshToken = jwt.sign({ UserIds ,UserEmail,UserName}, process.env.REFRASH_SECRET_KEY, {
    expiresIn: '7d'
  })
  const accsessTocken = jwt.sign({ UserIds,UserEmail,UserName }, process.env.ACSSESS_SECRET_KEY, {
    expiresIn: '15m'
  })
  return { refreshToken, accsessTocken }

}
const setCookies = (res, accsessTocken, refreshToken) => {
  res.cookie("access_Token", accsessTocken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000
  });
  res.cookie("refresh_Token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

export const Registration = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for empty fields
    if (!name || !password || !email) {
      return res.status(400).json({ error: "You have to fill all fields", success: false });
    }

    // Check if the email already exists
    const existEmail = await userAuthdata.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ error: "This email is already in use", success: false });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "the password must be greter than [6] number", success: false });
    }

    // Hash the password
    const salt = await bycrypt.genSalt(10);
    const hashingPassword = await bycrypt.hash(password, salt);

    // Create a new user
   
    const newUser = await userAuthdata.create({ name, email, password: hashingPassword });

    return res.status(201).json({
      message: "User is created",
      success: true,
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const IsUserIsHear = await userAuthdata.findOne({ email })
    if (!IsUserIsHear) {
      return res.status(400).json({ email, error: ": This User Not Found", success: false });
    }
    const UserPassword = bycrypt.compareSync(password, IsUserIsHear.password)
    if (IsUserIsHear && UserPassword) {
      const { refreshToken, accsessTocken } = SetToken(IsUserIsHear._id, IsUserIsHear.email,IsUserIsHear.name );
      console.log(IsUserIsHear.name )
      setCookies(res, accsessTocken, refreshToken);

      return res.status(200).json({ success: true, Username: IsUserIsHear.name, Id: IsUserIsHear._id, email: IsUserIsHear.email })
    } else {
      return res.status(400).json({ message: "incorrect Password or email", success: false });
    }
  } catch (error) {
    console.log("Error in Login controller", error.message);
    return res.status(500).json({ message: error.message });
  }

};
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_Token;

    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRASH_SECRET_KEY
      );
    
    }

    res.clearCookie("access_Token");
    res.clearCookie("refresh_Token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const accessToken = req.cookies.access_Token;
    if (!accessToken) return res.status(401).json({ isAuthenticated: false });

    jwt.verify(accessToken, process.env.ACSSESS_SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ isAuthenticated: false });

        res.status(200).json({ isAuthenticated: true, user });
    });
} catch (error) {
    console.error("Check auth error:", error);
    return res.status(500).json({ message: "Internal server error." });
}
};

export const RefreshToken=async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401); // Unauthorized

  // Verify the refresh token
  try {
      const decoded = jwt.verify(refreshToken, process.env.REFRASH_SECRET_KEY);
      const user = await userAuthdata.findById(decoded.id);
      if (!user || user.refreshToken !== refreshToken) {
          return res.sendStatus(403); // Forbidden
      }

      // Generate a new access token
      const newAccessToken = generateAccessToken(user._id);
      res.json({ accessToken: newAccessToken });
      res.status(200).json({ message: "Token refreshed successfully" });

  } catch (error) {
      console.error("Refresh token error:", error);
      return res.sendStatus(403); // Forbidden
  }
};
