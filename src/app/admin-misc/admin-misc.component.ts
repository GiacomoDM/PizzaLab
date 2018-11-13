import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Category } from '../category';
import { CategoryService } from '../category.service';
import { SettingsService } from './../settings.service';
import { Address } from '../address';

@Component({
  selector: 'app-admin-misc',
  templateUrl: './admin-misc.component.html',
  styleUrls: ['./admin-misc.component.css']
})
export class AdminMiscComponent implements OnInit {

  categories: Category[] = [];
  selectedCategory: Category;
  hasErrors: boolean;
  errorMsg: string;
  addForm: FormGroup;
  validName: boolean;
  @ViewChild('addClose') addClose: ElementRef;
  fileName: string = null;
  minHour: string;
  maxHour: string;
  deliveryStep: number;
  baseAddress: Address;

  constructor(
    private categoryService: CategoryService,
    private settingsService: SettingsService
  ) {
    this.addForm = new FormGroup({
      name: new FormControl()
    });
  }

  ngOnInit() {
    this.getCategories();
    this.getBaseAddress();
    this.getDeliveryTimeSettings();
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

  getDeliveryTimeSettings(): void {
    this.settingsService.getTimes().subscribe(
      times => {
        this.deliveryStep = times.step;
        this.minHour = times.min;
        this.maxHour = times.max;
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile recuperare i dati dal server.';
      }
    );
  }

  getBaseAddress(): void {
    this.settingsService.getAddress().subscribe(
      address => {
        this.baseAddress = new Address(
          address.name,
          address.lat,
          address.lng
        );
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile recuperare i dati dal server.';
      }
    );
  }

  addCategory(category: Category): void {
    this.categoryService.addCategory(category)
    .subscribe(
      newProd => {
        this.categories.push(newProd);
        this.addForm.reset();
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = `Impossibile aggiungere la categoria al database.`;
      }
    );
  }

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category)
    .subscribe(
      () => {
        this.categories = this.categories.filter(c => c !== category);
        this.selectedCategory = null;
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile rimuovere la categoria selezionato.';
      }
    );
  }

  onSelect(id: number) {
    this.selectedCategory = this.categories.find(c => c.id === id);
  }

  usedName(name: string) {
    if (this.categories.filter(c => c.name.toLowerCase() === name.toLowerCase().trim()).length > 0) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    const category: Category = new Category(
      this.addForm.value.name.trim()
    );
    this.addCategory(category);
    this.addClose.nativeElement.click();
  }

  fileInput(fileInput) {
    this.fileName = fileInput.target.files[0].name;
  }
}
