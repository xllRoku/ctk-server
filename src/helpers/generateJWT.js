import jwt from "jsonwebtoken";

const generateJWT = (uid) => {
  const expiresIn = 60 * 15;
  return jwt.sign({ uid }, "741852963", {
    expiresIn,
  });
};

export { generateJWT };
