import { Component, OnInit } from '@angular/core';

import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-admin-misc',
  templateUrl: './admin-misc.component.html',
  styleUrls: ['./admin-misc.component.css']
})
export class AdminMiscComponent implements OnInit {

  categories: Category[];
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

}
