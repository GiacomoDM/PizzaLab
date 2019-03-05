import { Address } from './address';
import { OrderItem } from './orderItem';

export class Order {
  id: string;
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
