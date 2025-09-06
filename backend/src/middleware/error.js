import { isModelError } from "../errors/model-error/index.js";
export const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  if (isModelError(err)) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(500).send("Algo deu errado no servidor.");
};
