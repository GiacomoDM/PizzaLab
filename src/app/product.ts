export class Product {
  name: string;
  price: number;
  categoryId: number;

  constructor(name: string, price: number, categoryId: number) {
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
  }
}
