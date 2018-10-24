export class OrderItem {
  name: string;
  category: string;
  price: number;

  constructor(name: string, category: string, price: number) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
