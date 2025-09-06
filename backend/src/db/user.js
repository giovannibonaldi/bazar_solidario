import { db } from "./index.js";
import { User } from "../models/user/index.js";

export const usersTable = "users";

export const createDbUser = async () => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS ${usersTable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
};

export class UserRepository {
  async create(user) {
    const { lastID } = await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [user.name, user.email, user.password]
    );
    return lastID;
  }

  async findByEmail(email) {
    const row = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!row) return null;
    const user = new User(row.name, row.email);
    user.id = row.id;
    user.password = row.password;
    return user;
  }
}

export const userRepo = new UserRepository();
