import mongoose, { model } from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "the email is reqired"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "the Password is reqired"],
      minlength: [6, "the password must be greter than 6 digits"],
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
