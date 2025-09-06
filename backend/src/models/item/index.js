import { ItemError } from "../../errors/item-error/index.js";

export class Item {
  #id;

  constructor({ title, description, price, isDonation, imageUrl, ownerId }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.isDonation = isDonation;
    this.imageUrl = imageUrl;
    this.ownerId = ownerId;
  }
  get id() {
    return this.#id;
  }
  set id(value) {
    if (value <= 0) throw new ItemError("ID inválido.");
    this.#id = value;
  }
}
