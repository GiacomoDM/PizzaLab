import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { Product } from '../product';
import { Category } from '../category';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  categories: Category[];
  products: Product[] = [];
  selectedProduct: Product;
  hasErrors: boolean;
  errorMsg: string;
  addForm: FormGroup;
  validName: boolean;
  @ViewChild('addClose') addClose: ElementRef;
  currentPage = 1;
  sortType = 'id';
  sortReverse = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
      this.addForm = new FormGroup({
        name: new FormControl(),
        price: new FormControl(),
        category: new FormControl()
    });
   }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile recuperare i dati dal server.';
      }
    );
  }

  getProducts(): void {
    this.productService.getProducts()
    .subscribe(
      products => {
        this.products = products;
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = `Impossibile recuperare i dati dal server.`;
      }
    );
  }

  addProduct(product: Product): void {
    this.productService.addProduct(product)
    .subscribe(
      newProd => {
        this.products.push(newProd);
        this.addForm.reset();
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = `Impossibile aggiungere il prodotto al database.`;
      }
    );
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product)
    .subscribe(
      () => {
        this.products = this.products.filter(p => p !== product);
        this.selectedProduct = null;
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile rimuovere il prodotto selezionato.';
      }
    );
  }

  getCategoryName(product: Product): string {
    return this.categories.find(cat => cat.id === product.categoryId).name;
  }

  getCategoryId(name: string): number {
    return this.categories.find(cat => cat.name === name).id;
  }

  onSelect(id: number) {
    this.selectedProduct = this.products.find(p => p.id === id);
  }

  usedName(name: string) {
    if (this.products.filter(p => p.name.toLowerCase() === name.toLowerCase().trim()).length > 0) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    const product: Product = new Product(
      this.addForm.value.name.trim(),
      this.addForm.value.price,
      this.getCategoryId(this.addForm.value.category)
    );
    this.addProduct(product);
    this.addClose.nativeElement.click();
  }

  reverse(type: string): void {
    if (this.sortType === type) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortReverse = false;
    }
  }
}
