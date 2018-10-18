import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  @Input() currentOrder: Product[] = [];

  constructor() { }

  ngOnInit() {
  }

  getTotal() {
    return this.currentOrder.reduce((partial, actual) => partial + actual.price, 0);
    console.log(this.currentOrder);
  }

}
