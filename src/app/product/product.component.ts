import { Component, OnInit, Input } from '@angular/core';

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
}
