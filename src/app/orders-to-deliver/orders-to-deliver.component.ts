import { Component, OnInit } from '@angular/core';

import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-orders-to-deliver',
  templateUrl: './orders-to-deliver.component.html',
  styleUrls: ['./orders-to-deliver.component.css']
})
export class OrdersToDeliverComponent implements OnInit {

  orders: Order[];
  hasErrors: boolean;
  errorMsg: string;
  currentPage = 1;
  sortType = 'delivery';
  sortReverse = true;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrdersToDeliver().subscribe(
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

  reverse(type: string): void {
    if (this.sortType === type) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortReverse = false;
    }
  }
}
