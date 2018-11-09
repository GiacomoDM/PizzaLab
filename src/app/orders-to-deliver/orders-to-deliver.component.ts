import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-orders-to-deliver',
  templateUrl: './orders-to-deliver.component.html',
  styleUrls: ['./orders-to-deliver.component.css']
})
export class OrdersToDeliverComponent implements OnInit {

  orders: Order[] = [];
  delivery: Order[] = [];
  hasErrors: boolean;
  errorMsg: string;
  currentPage = 1;
  // Dragula
  subs = new Subscription();

  constructor(
    private orderService: OrderService,
    private dragulaService: DragulaService
  ) {
    this.dragulaService.createGroup('ORDERS', { revertOnSpill: true });
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrdersToDeliver()
    .subscribe(
      orders => {
        this.orders = orders;
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile recuperare i dati dal server.';
      }
    );
  }

  updateOrder(order: Order): void {
    this.orderService.updateOrder(order)
    .subscribe(
      () => {
        this.delivery = this.delivery.filter(o => o !== order);
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile confermare l\'ordine';
      }
    );
  }

  confirmDelivery(): void {
    this.delivery.forEach(order => {
      order.delivered = true;
      this.updateOrder(order);
    });
  }

  /*
  addOrderToDelivery(order: Order): void {
    this.orders = this.orders.filter(o => o !== order);
    this.delivery.push(order);
  }

  removeOrderFromDelivery(order: Order): void {
    this.delivery = this.delivery.filter(o => o !== order);
    this.orders.push(order);
  }
  */

  abortDelivery(): void {
    this.orders = this.orders.concat(this.delivery);
    this.delivery.length = 0;
  }
}
