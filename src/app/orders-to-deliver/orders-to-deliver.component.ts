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
  confirmable = false;
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
  @ViewChild('routeInfo') routeInfo: ElementRef;
  routeUrl: string;

  constructor(
    private orderService: OrderService,
    private dragulaService: DragulaService
  ) {
    this.dragulaService.createGroup('ORDERS', { revertOnSpill: true });
    this.subs.add(this.dragulaService.drop('ORDERS')
      .subscribe(
        ( {source, target}) => {
          if ((source.hasAttribute('delivery') && target.hasAttribute('orders'))
            || (source.hasAttribute('orders') && target.hasAttribute('delivery'))) {
            if (this.delivery.length > 0) {
              this.confirmable = true;
              this.removeMarker();
              this.map.controls[google.maps.ControlPosition.LEFT_CENTER].clear();
              this.calcRoute();
            } else {
              this.confirmable = false;
              this.clearDelivery();
              this.routeUrl = null;
            }
          }
        })
      );
  }

  ngOnInit() {
    this.getOrders();
    this.initMap();
  }

  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();
    // destroy dragula container
    this.dragulaService.destroy('ORDERS');
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
    this.clearDelivery();
    this.delivery.splice(0, this.delivery.length);
  }

  clearDelivery(): void {
    this.directionsDisplay.set('directions', null);
    this.removeMarker();
    this.setMarker();
    this.totalDistance = null;
    this.totalTime = null;
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
    this.clearDelivery();
    this.orders = this.orders.concat(this.delivery);
    this.delivery = [];
    this.confirmable = false;
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
      animation: google.maps.Animation.DROP
    });
  }

  removeMarker() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  getWayPoints() {
    const waypoints = [];
    // const delivery = this.delivery.slice(0, this.delivery.length - 1);
    this.delivery.forEach(
      order => {
        waypoints.push(
          {
            location:  {
              lat: order.address.lat,
              lng: order.address.lng
            },
            stopover: true
          }
        );
      }
    );
    return waypoints;
  }

  calcRoute() {
    const DirectionsRequest = {
      origin: this.baseAddress,
      destination: this.baseAddress,
      waypoints: this.getWayPoints(),
      optimizeWaypoints: true,
      provideRouteAlternatives: false,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: google.maps.TrafficModel.PESSIMISTIC
      },
      unitSystem: google.maps.UnitSystem.METRIC
    };

    /* console.log(DirectionsRequest.destination);

    if (this.delivery.length > 1) {
      DirectionsRequest['waypoints'] = this.getWayPoints();
      DirectionsRequest['optimizeWaypoints'] = true;
    } */

    this.directionsService.route(DirectionsRequest, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);
        const route = result.routes[0];
        this.totalDistance = 0;
        this.totalTime = 0;
        route.legs.forEach(
          leg => {
            this.totalDistance = this.totalDistance + leg.distance.value;
            this.totalTime = this.totalTime + leg.duration.value;
          }
        );
        this.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(this.routeInfo.nativeElement);
        if (this.delivery && this.delivery.length < 10) {
          this.setRouteLink(route.waypoint_order);
        } else {
          this.routeUrl = null;
        }
      }

    });
  }

  getDistance(): number {
    if (this.totalDistance > 1000) {
      return (this.totalDistance / 1000);
    }
    return this.totalDistance;
  }

  getDuration(): number {
    return Math.floor(this.totalTime / 60);
  }

  setBaseUrl(): string {
    return 'https://www.google.com/maps/dir/?api=1&'
      + 'origin=' + this.baseAddress.lat + ',' + this.baseAddress.lng
      + '&destination=' + this.baseAddress.lat + ',' + this.baseAddress.lng
      + '&travelmode=driving&waypoints=';
  }

  setRouteLink(sortOrder: number[]): void {
    this.routeUrl = this.setBaseUrl();
    sortOrder.forEach(
      position => {
        this.routeUrl = this.routeUrl +
        + this.delivery[position].address.lat
        + ',' + this.delivery[position].address.lng
        + '|';
      }
    );
    this.routeUrl = this.routeUrl.substring(0, this.routeUrl.length - 1);
  }
}
