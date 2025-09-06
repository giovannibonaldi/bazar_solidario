import { ModelError } from "../model-error/index.js";

export class UserError extends ModelError {
  constructor(message) {
    super(message);
    this.name = "UserError";
  }
}
