import { usersTable } from "./user.js";
import { db } from "./index.js";

export const createItemDb = async () => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        price REAL,
        isDonation INTEGER DEFAULT 0,
        imageUrl TEXT,
        ownerId INTEGER,
        FOREIGN KEY (ownerId) REFERENCES ${usersTable}(id)
    )
  `);
};

export class ItemRepository {
  async create(item) {
    const { lastID } = await db.run(
      `INSERT INTO items (title, description, price, isDonation, imageUrl, ownerId) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        item.title,
        item.description,
        item.price,
        item.isDonation ? 1 : 0,
        item.imageUrl,
        item.ownerId,
      ]
    );
    return lastID;
  }
  findAll() {
    return db.all("SELECT * FROM items");
  }
  findById(id) {
    return db.get("SELECT * FROM items WHERE id = ?", [id]);
  }
}

export const itemRepo = new ItemRepository();
