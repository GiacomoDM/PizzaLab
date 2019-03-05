export class Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;

  constructor(name: string, price: number, categoryId: string) {
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
  }
}
