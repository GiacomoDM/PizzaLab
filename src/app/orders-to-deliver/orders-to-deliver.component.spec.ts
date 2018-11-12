import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersToDeliverComponent } from './orders-to-deliver.component';

describe('OrdersToDeliverComponent', () => {
  let component: OrdersToDeliverComponent;
  let fixture: ComponentFixture<OrdersToDeliverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersToDeliverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersToDeliverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
