import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../category';
import { Product } from '../product';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  @Input() currentOrder: Product[];
  @Input() categories: Category[];
  @Output() updatedOrder = new EventEmitter<Product[]>();

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
  }

  getTotal(): number {
    return this.currentOrder.reduce((partial, actual) => partial + actual.price, 0);
  }

  addProductToOrder(product: Product): void {
    this.currentOrder.push(product);
    this.updatedOrder.emit(this.currentOrder);
  }

  removeProductFromOrder(index: number): void {
    this.updatedOrder.emit(this.currentOrder.splice(index, 1));
  }

  clearOrders(): void {
    this.currentOrder.length = 0;
    this.updatedOrder.emit(this.currentOrder);
  }

  getCategoryName(product: Product): string {
    return this.categories.find(cat => cat.id === product.categoryId).name;
  }

  confirmOrder(): void {
    this.orderService.setCurrentOrderItems(this.currentOrder);
  }
}
