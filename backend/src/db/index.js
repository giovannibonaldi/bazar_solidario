import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { createDbUser } from "./user.js";
import { createItemDb } from "./item.js";

async function openDb() {
  return open({
    filename: "bazar.db",
    driver: sqlite3.Database,
  });
}

export const db = await openDb();

export const startDb = async () => {
  await createDbUser();
  await createItemDb();
};
