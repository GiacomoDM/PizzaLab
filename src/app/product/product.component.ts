import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from './../product';
import { Category } from './../category';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() category: Category;
  products: Product[];
  @Input() currentOrder: Product[];
  @Output() updatedOrder = new EventEmitter<Product[]>();
  hasErrors: boolean;
  errorMsg: string;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProductsByCategory(this.category.id)
    .subscribe(
      products => {
        this.products = products;
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = `Impossibile recuperare ${this.category.name} dal server.`;
      }
    );
  }

  addProductToOrder(product: Product): void {
    this.currentOrder.push(product);
    this.updatedOrder.emit(this.currentOrder);
  }
}
