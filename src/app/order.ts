export class Order {
  id: number;
  client: string;
  address: string;
  hour: Date;

  constructor(client: string, address: string, hour: Date) {
    this.client = client;
    this.address = address;
    this.hour = hour;
  }
}
