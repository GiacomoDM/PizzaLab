/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class AdminMiscComponent implements OnInit, AfterViewInit {

  categories: Category[] = [];
  selectedCategory: Category;
  errorMsg = 'Impossibile recuperare i dati dal server.';
  hasCategoryErrors: boolean;
  errorMsgCategory: string;
  hasDeliveryErrors: boolean;
  errorMsgDelivery: string;
  hasAddressErrors: boolean;
  errorMsgAddress: string;
  addForm: FormGroup;
  validName: boolean;
  @ViewChild('addClose') addClose: ElementRef;
  fileName: string = null;
  minHour: string;
  maxHour: string;
  deliveryStep: number;
  baseAddress: Address;
  editTimes = false;
  editAddress = false;
  @ViewChild('searchAddress') inputElement: ElementRef;
  autocomplete: google.maps.places.Autocomplete;

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

  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputElement.nativeElement);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        this.hasCategoryErrors = false;
      },
      err => {
        this.hasCategoryErrors = true;
        this.errorMsgCategory = 'Impossibile recuperare le categorie dal server.';
      }
    );
  }

  getDeliveryTimeSettings(): void {
    this.settingsService.getTimes().subscribe(
      times => {
        this.minHour = times.min;
        this.maxHour = times.max;
        this.deliveryStep = times.step / 60;
        this.hasDeliveryErrors = false;
      },
      err => {
        this.hasDeliveryErrors = true;
        this.errorMsgDelivery = 'Impossibile recuperare i parametri delle consegne dal server.';
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
        this.hasAddressErrors = false;
      },
      err => {
        this.hasAddressErrors = true;
        this.errorMsgAddress = 'Impossibile recuperare l\'indirizzo della pizzeria dal server.';
      }
    );
  }

  addCategory(category: Category): void {
    this.categoryService.addCategory(category)
    .subscribe(
      newProd => {
        this.categories.push(newProd);
        this.addForm.reset();
        this.hasCategoryErrors = false;
      },
      err => {
        this.hasCategoryErrors = true;
        this.errorMsgCategory = `Impossibile aggiungere la categoria al database.`;
      }
    );
  }

  deleteCategory(category: Category): void {
    this.categoryService.deleteCategory(category)
    .subscribe(
      () => {
        this.categories = this.categories.filter(c => c !== category);
        this.selectedCategory = null;
        this.hasCategoryErrors = false;
      },
      err => {
        this.hasCategoryErrors = true;
        this.errorMsgCategory = 'Impossibile rimuovere la categoria selezionato.';
      }
    );
  }

  updateTimes(): void {
    this.settingsService.updateTimes(
      {
        'min': this.minHour,
        'max': this.maxHour,
        'step': this.deliveryStep * 60
      }).subscribe(
        () => {
          this.editTimes = false;
          this.hasDeliveryErrors = false;
        },
        err => {
          this.hasDeliveryErrors = true;
          this.errorMsgDelivery = 'Impossibile salvare i dati.';
        }
      );
  }

  updateAddress(address: Address): void {
    this.settingsService.updateAddress(address)
    .subscribe(
      () => {
        this.editAddress = false;
        this.hasAddressErrors = false;
      },
      err => {
        this.hasAddressErrors = true;
        this.errorMsgAddress = 'Impossibile salvare l\'indirizzo.';
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

  fileInput(fileInput): void {
    this.fileName = fileInput.target.files[0].name;
  }

  abortEditTimes(): void {
    this.getDeliveryTimeSettings();
    this.editTimes = false;
  }

  saveEditTimes(): void {
    this.updateTimes();
  }

  abortEditAddress(): void {
    this.getBaseAddress();
    this.editAddress = false;
  }

  saveEditAddress(): void {
    const place = this.autocomplete.getPlace();
    this.updateAddress(
      new Address(
        place.formatted_address,
        place.geometry.location.lat(),
        place.geometry.location.lng()
      )
    );
  }
}
