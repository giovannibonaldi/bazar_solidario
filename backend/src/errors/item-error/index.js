import { ModelError } from "../model-error/index.js";

export class ItemError extends ModelError {
  constructor(message) {
    super(message);
    this.name = "ItemError";
  }
}
