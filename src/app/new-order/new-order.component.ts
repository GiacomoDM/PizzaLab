/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

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
export class NewOrderComponent implements OnInit {

  orderConfirmed = false;
  orderItems: Product[];
  categories: Category[];
  @ViewChild('searchAddress') inputElement: ElementRef;
  autocomplete: google.maps.places.Autocomplete;
  orderForm: FormGroup;
  hasErrors: boolean;
  errorMsg: string;
  deliveryTimes = [
    '18:30',
    '18:45',
    '19:00',
    '19:15',
    '19:30',
    '19:45',
    '20:00',
    '20:15',
    '20:30',
    '20:45',
    '21:00',
    '21:15',
    '21:30',
    '21:45',
    '22:00'
  ];

  constructor(
    private orderService: OrderService,
    private categoryService: CategoryService
  ) {
      this.orderForm = new FormGroup({
        client: new FormControl(),
        // address: new FormControl(),
        delivery: new FormControl()
    });
  }

  ngOnInit() {
    this.orderItems = this.orderService.getCurrentOrderItems();
    this.getCategories();
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
      this.setDeliveryTime(this.orderForm.value.delivery),
      this.setOrderItems(),
      this.getTotal(),
      false
    );
    this.confirmOrder(order);
  }

  setDeliveryTime(delivery: String): Date {
    const times = delivery.split(':');
    const now = new Date();
    now.setHours(+times[0], +times[1], 0, 0);
    return now;
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
