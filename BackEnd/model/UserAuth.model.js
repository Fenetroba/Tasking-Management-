import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      minlength: [6, "The password must be greater than 6 digits"],
    },
    refreshToken: { // Add this line
      type: String,
      required: true, // You can set this to true if you want to enforce it
    },
    UserTasks: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        Tasks: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "tasks",
        },
      },
    ],
  },
  { timestamps: true }
);

const userAuthdata = mongoose.model("User", UserSchema);
export default userAuthdata;