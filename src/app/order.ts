import { OrderItem } from './orderItem';

export class Order {
  id: number;
  client: string;
  address: string;
  delivery: Date;
  orderItems: OrderItem[];
  total: number;

  constructor(client: string, address: string, delivery: Date, orderItems: OrderItem[], total: number) {
    this.client = client;
    this.address = address;
    this.delivery = delivery;
    this.orderItems = orderItems;
    this.total = total;
  }
}
