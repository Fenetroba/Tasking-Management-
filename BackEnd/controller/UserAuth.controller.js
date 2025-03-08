import userAuthdata from "../model/UserAuth.model.js";
import bycrypt from 'bcrypt'
import env from 'dotenv'
env.config()
import jwt from 'jsonwebtoken'
const SetToken = (UserId) => {
  const refreshToken = jwt.sign({ UserId }, process.env.REFRASH_SECRET_KEY, {
    expiresIn: '7d'
  })
  const accsessTocken = jwt.sign({ UserId }, process.env.ACSSESS_SECRET_KEY, {
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

    // Hash the password
    const salt = await bycrypt.genSalt(10);
    const hashingPassword = await bycrypt.hash(password, salt);

    // Create a new user
    const newUser = await userAuthdata.create({ name, email, password: hashingPassword });

    // Set tokens
    const { refreshToken, accessToken } = SetToken(newUser._id);
    setCookies(res, accessToken, refreshToken);

    // Send response
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
      const { refreshToken, accsessTocken } = SetToken(IsUserIsHear._id);
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
export const logout = async (req, res) => { };
