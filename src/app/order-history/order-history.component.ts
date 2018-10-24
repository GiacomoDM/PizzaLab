import { Component, OnInit } from '@angular/core';

import { OrderService } from '../order.service';
import { Order } from '../order';
import { OrderItem } from './../orderItem';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[];
  hasErrors: boolean;
  errorMsg: string;
  currentPage = 1;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(
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
}
