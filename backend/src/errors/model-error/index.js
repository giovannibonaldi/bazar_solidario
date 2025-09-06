export class ModelError extends Error {
  constructor(message) {
    super(message);
    this.name = "ModelError";
    this.statusCode = 400;
  }
}

export const isModelError = (error) => {
  return error instanceof ModelError;
};
