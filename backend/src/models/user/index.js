import { UserError } from "../../errors/user-error/index.js";
import bcrypt from "bcryptjs";

export class User {
  #id;
  #password;

  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    if (this.#id) {
      throw new UserError("ID is already set and cannot be changed.");
    }
    if (value !== null && typeof value !== "number" && value > 0) {
      throw new UserError("ID must be a positive integer.");
    }
    this.#id = value;
  }

  get password() {
    return this.#password;
  }

  set password(value) {
    if (!value || value.length < 6) {
      throw new UserError("Password must be at least 6 characters long.");
    }
    this.#password = value;
  }

  async hashPassword(password) {
    if (!password || password.length < 6) {
      throw new UserError("Password must be at least 6 characters long.");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    this.#password = hashedPassword;
  }

  comparePassword(password) {
    return bcrypt.compare(password, this.#password);
  }
}
