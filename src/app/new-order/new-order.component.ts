import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { Product } from '../product';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  orderItems: Product[];
  orderForm: FormGroup;

  constructor(
    private orderService: OrderService
  ) {
      this.orderForm = new FormGroup({
        client: new FormControl(),
        address: new FormControl(),
        hours: new FormControl()
    });
  }

  ngOnInit() {
    this.orderItems = this.orderService.getOrderItems();
  }

  getTotal(): number {
    return this.orderService.getTotal();
  }

}
