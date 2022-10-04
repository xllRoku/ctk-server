import { User } from "../models/user.model.js";
import { generateJWT } from "../../../helpers/generateJWT.js";
import { refreshToken } from "../../../helpers/refreshToken.js";

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = new User({ username, password, email });

    const { token, expiresIn } = generateJWT(user._id);
    refreshToken(user._id, res);

    user.token = token;
    const userWithToken = await User.findOneAndUpdate(
      { email },
      { token: user.token },
      { new: true }
    );
    await user.save();

    // const token = userWithToken.token;

    return res.status(202).json({
      message: "Usuario creado con éxito",
      token: token,
      expiresIn: expiresIn,
    });
  } catch (error) {
    if (error.code === 11000) {
      const msgError = new Error("Ya existe este usuario");
      return res.status(400).json({ message: msgError.message });
    }
    // const msgError = new Error("Error del servidor");
    // return res.status(500).json({ message: msgError.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      const msgError = new Error("El usuario no existe");
      return res.status(404).json({ message: msgError.message });
    }

    const correctPassword = await user.comparePassword(password);

    if (!correctPassword) {
      const msgError = new Error("Contraseña incorrecta");
      return res.status(404).json({ message: msgError.message });
    }

    user.token = generateJWT(user._id);
    const userWithToken = await User.findOneAndUpdate(
      { email },
      { token: user.token },
      { new: true }
    );
    await user.save();

    return res.status(200).json({ ok: "ok", token: userWithToken.token });
  } catch (error) {
    console.log(error);

    const msgError = new Error("Error del servidor");
    return res.status(500).json({ message: msgError.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    console.log(user);
    return res.status(202).json({ uid: user._id, email: user.email });
  } catch (error) {
    return res.status(500).json({ error: "error de server" });
  }
};

const sayHi = (_, res) => {
  res.json({ hi: "hello world" });
};

export { createUser, loginUser, profile, sayHi };
