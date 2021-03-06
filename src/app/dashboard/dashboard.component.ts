import { Component, OnInit } from '@angular/core';

import { Category } from './../category';
import { CategoryService } from './../category.service';
import { Product } from '../product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  categories: Category[];
  currentOrder: Product[] = [];
  hasErrors: boolean;
  errorMsg: string;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
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

  removeProduct(id: string): void {
    this.currentOrder = this.currentOrder.filter(p => p.id !== id);
  }
}
