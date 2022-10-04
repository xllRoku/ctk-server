import jwt from "jsonwebtoken";

export const refreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;

  try {
    const refreshToken = jwt.sign({ uid }, "147258369");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //   secure: !(process.env.MOD === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.error(error);
  }
};
