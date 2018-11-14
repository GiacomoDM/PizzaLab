/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { SettingsService } from './../settings.service';
import { Product } from '../product';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { OrderItem } from './../orderItem';
import { Category } from './../category';
import { CategoryService } from './../category.service';
import { Address } from '../address';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit, AfterViewInit {

  orderConfirmed = false;
  orderItems: Product[];
  categories: Category[];
  @ViewChild('searchAddress') inputElement: ElementRef;
  autocomplete: google.maps.places.Autocomplete;
  orderForm: FormGroup;
  hasErrors: boolean;
  errorMsg: string;
  minHour: string;
  maxHour: string;
  deliveryStep: number;

  constructor(
    private settingsService: SettingsService,
    private orderService: OrderService,
    private categoryService: CategoryService
  ) {
      this.orderForm = new FormGroup({
        client: new FormControl(),
        delivery: new FormControl(this.minHour)
    });
  }

  ngOnInit() {
    this.orderItems = this.orderService.getCurrentOrderItems();
    this.getDeliveryTimeSettings();
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputElement.nativeElement);
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

  getTotal(): number {
    return this.orderService.getCurrentOrderTotal();
  }

  confirmOrder(order: Order): void {
    this.orderService.addOrder(order)
    .subscribe(
      newProd => {
        this.hasErrors = false;
        this.orderForm.reset();
        this.orderConfirmed = true;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = `Impossibile confermare l'ordine.`;
      }
    );
  }

  onSubmit(): void {
    const place = this.autocomplete.getPlace();
    const order: Order = new Order(
      this.orderForm.value.client.trim(),
      new Address(
        place.formatted_address,
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ),
      this.getTime(this.orderForm.value.delivery),
      this.setOrderItems(),
      this.getTotal(),
      false
    );
    this.confirmOrder(order);
  }

  getTime(time: String): Date {
    const times = time.split(':');
    const now = new Date();
    now.setHours(+times[0], +times[1], 0, 0);
    return now;
  }

  validateTime(delivery: String): boolean {
    if (delivery) {
      const now = this.getTime(delivery);
      const min = this.getTime(this.minHour);
      const max = this.getTime(this.maxHour);
      if (now >= min && now <= max) {
        return true;
      }
    }
    return false;
  }

  setOrderItems(): OrderItem[] {
    const items: OrderItem[] = [];
    this.orderItems.forEach(product => {
      items.push(
        new OrderItem(
          product.name,
          this.categories.find(cat => cat.id === product.categoryId).name,
          product.price
        )
      );
    });
    return items;
  }
}
