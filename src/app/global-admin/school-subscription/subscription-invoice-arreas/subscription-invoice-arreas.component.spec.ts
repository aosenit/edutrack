import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionInvoiceArreasComponent } from './subscription-invoice-arreas.component';

describe('SubscriptionInvoiceArreasComponent', () => {
  let component: SubscriptionInvoiceArreasComponent;
  let fixture: ComponentFixture<SubscriptionInvoiceArreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionInvoiceArreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionInvoiceArreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
