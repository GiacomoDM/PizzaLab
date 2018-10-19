import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

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
  addForm: FormGroup;
  @ViewChild('addClose') addClose: ElementRef;

  constructor(
    private productService: ProductService
  ) {
      this.addForm = new FormGroup({
        name: new FormControl(),
        price: new FormControl()
    });
   }

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

  addProduct(product: Product): void {
    this.productService.addProduct(product)
    .subscribe(
      newProd => {
        this.products.push(newProd);
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = `Impossibile aggiungere il prodotto al database.`;
      }
    );
  }

  addProductToOrder(product: Product): void {
    this.currentOrder.push(product);
    this.updatedOrder.emit(this.currentOrder);
  }

  onSubmit(): void {
    const product: Product = new Product(
      this.addForm.value.name.trim(),
      this.addForm.value.price,
      this.category.id
    );
    this.addProduct(product);
    this.addClose.nativeElement.click();
    this.addForm.reset();
  }
}
