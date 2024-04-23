import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidSubscriptionsComponent } from './unpaid-subscriptions.component';

describe('UnpaidSubscriptionsComponent', () => {
  let component: UnpaidSubscriptionsComponent;
  let fixture: ComponentFixture<UnpaidSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
