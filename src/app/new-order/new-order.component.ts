import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from '../product';
import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  orderItems: Product[];
  orderForm: FormGroup;
  hasErrors: boolean;
  errorMsg: string;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {
      this.orderForm = new FormGroup({
        client: new FormControl(),
        address: new FormControl(),
        hours: new FormControl(new Date())
    });
  }

  ngOnInit() {
    this.orderItems = this.orderService.getCurrentOrderItems();
  }

  getTotal(): number {
    return this.orderService.getCurrentOrderTotal();
  }

  confirmOrder(order: Order): void {
    this.orderService.addOrder(order)
    .subscribe(
      newProd => {
        this.hasErrors = false;
        this.orderForm.reset();
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = `Impossibile confermare l'ordine.`;
      }
    );
  }

  onSubmit(): void {
    const order: Order = new Order(
      this.orderForm.value.client.trim(),
      this.orderForm.value.address.trim(),
      this.orderForm.value.hours
    );
    this.confirmOrder(order);
  }
}
