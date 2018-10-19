import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  @Input() currentOrder: Product[];
  @Output() updatedOrder = new EventEmitter<Product[]>();

  constructor() { }

  ngOnInit() {
  }

  getTotal(): number {
    return this.currentOrder.reduce((partial, actual) => partial + actual.price, 0);
    console.log(this.currentOrder);
  }

  addProductToOrder(product: Product): void {
    this.currentOrder.push(product);
    this.updatedOrder.emit(this.currentOrder);
  }

  removeProductFromOrder(index: number): void {
    this.currentOrder.splice(index, 1);
    this.updatedOrder.emit(this.currentOrder);
  }

}
