import jwt from "jsonwebtoken";
// import { tokenVerificationErrors } from "../helpers/tokenVerificationErrors.js";

const checkAuth = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!(token && token.startsWith("Bearer"))) {
    throw new Error("No Bearer");
  }
  token = token.split(" ")[1];
  console.log(token);
  const { uid } = jwt.verify(token, "741852963");

  req.uid = uid;

  next();
};

export { checkAuth };
