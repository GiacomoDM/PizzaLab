import { OrderItem } from './orderItem';

export class Order {
  id: number;
  client: string;
  address: string;
  delivery: Date;
  orderItems: OrderItem[];

  constructor(client: string, address: string, delivery: Date, orderItems: OrderItem[]) {
    this.client = client;
    this.address = address;
    this.delivery = delivery;
    this.orderItems = orderItems;
  }
}
