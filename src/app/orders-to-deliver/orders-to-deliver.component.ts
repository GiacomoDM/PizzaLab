/// <reference types="@types/googlemaps" />

import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-orders-to-deliver',
  templateUrl: './orders-to-deliver.component.html',
  styleUrls: ['./orders-to-deliver.component.css']
})
export class OrdersToDeliverComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  delivery: Order[] = [];
  hasErrors: boolean;
  errorMsg: string;
  currentPage = 1;
  // Dragula
  subs = new Subscription();
  // Maps
  @ViewChild('gmap') gmapElement: ElementRef;
  map: google.maps.Map;
  directionsService: google.maps.DirectionsService;
  directionsDisplay: google.maps.DirectionsRenderer;
  marker: google.maps.Marker;
  baseAddress = {
    lat: 45.409688,
    lng: 11.891188
  };
  totalDistance: number;
  totalTime: number;

  constructor(
    private orderService: OrderService,
    private dragulaService: DragulaService
  ) {
    this.dragulaService.createGroup('ORDERS', { revertOnSpill: true });
  }

  ngOnInit() {
    this.getOrders();
    this.initMap();
  }

  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();
  }

  getOrders(): void {
    this.orderService.getOrdersToDeliver()
    .subscribe(
      orders => {
        this.orders = orders;
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile recuperare i dati dal server.';
      }
    );
  }

  updateOrder(order: Order): void {
    this.orderService.updateOrder(order)
    .subscribe(
      () => {
        this.delivery = this.delivery.filter(o => o !== order);
        this.hasErrors = false;
      },
      err => {
        this.hasErrors = true;
        this.errorMsg = 'Impossibile confermare l\'ordine';
      }
    );
  }

  confirmDelivery(): void {
    this.delivery.forEach(order => {
      order.delivered = true;
      this.updateOrder(order);
    });
  }

  /*
  addOrderToDelivery(order: Order): void {
    this.orders = this.orders.filter(o => o !== order);
    this.delivery.push(order);
  }

  removeOrderFromDelivery(order: Order): void {
    this.delivery = this.delivery.filter(o => o !== order);
    this.orders.push(order);
  }
  */

  abortDelivery(): void {
    this.orders = this.orders.concat(this.delivery);
    this.delivery.length = 0;
  }

  // MAPS

  initMap() {
    const mapProp = {
      center: this.baseAddress,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.setMarker();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);
  }

  setMarker() {
    this.marker = new google.maps.Marker({
      position: this.baseAddress,
      map: this.map,
      title: 'Pizzeria',
      // label: 'Pizzeria',
      animation: google.maps.Animation.DROP
    });
  }

  removeMarker() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  /*
  setWayPoints() {
    const waypoints = [];
    const delivery = this.delivery.slice(0, this.delivery.length - 1);
    delivery.forEach(
      order => {
        waypoints.push(
          {
            location:  order.address.getLatLng(),
            stopover: true
          }
        );
      }
    );
    return waypoints;
  }
  */
}
