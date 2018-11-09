import { Address } from './Address';
import { OrderItem } from './orderItem';

export class Order {
  id: number;
  client: string;
  address: Address;
  delivery: Date;
  orderItems: OrderItem[];
  total: number;
  delivered: boolean;

  constructor(client: string, address: Address, delivery: Date, orderItems: OrderItem[], total: number, delivered: boolean) {
    this.client = client;
    this.address = address;
    this.delivery = delivery;
    this.orderItems = orderItems;
    this.total = total;
    this.delivered = delivered;
  }
}
