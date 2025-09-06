import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const bearerToken = req.header("authorization"); // [Bearer, dajksndjkanjkfcn.bndasjndjklasda.]
    if (!bearerToken) {
      return res.status(401).json({ msg: "Nenhum token, autorização negada." });
    }
    const [_, token] = bearerToken.split(" ");
    if (!token) {
      return res.status(401).json({ msg: "Token mal formatado." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token não é válido." });
  }
};
