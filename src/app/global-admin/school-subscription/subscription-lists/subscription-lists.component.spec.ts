import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionListsComponent } from './subscription-lists.component';

describe('SubscriptionListsComponent', () => {
  let component: SubscriptionListsComponent;
  let fixture: ComponentFixture<SubscriptionListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
