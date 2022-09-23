import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.error(error);
    throw new Error("falló el hash");
  }
});

userSchema.methods.comparePassword = async function (cantidadePassword) {
  return await bcryptjs.compare(cantidadePassword, this.password);
};

const User = model("User", userSchema);

export { User };
