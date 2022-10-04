import jwt from "jsonwebtoken";

const generateJWT = (uid) => {
  const expiresIn = 60 * 15;
  const token = jwt.sign({ uid }, "741852963", {
    expiresIn,
  });

  return { token, expiresIn };
};

export { generateJWT };
