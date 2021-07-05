import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionDashboardComponent } from './promotion-dashboard.component';

describe('PromotionDashboardComponent', () => {
  let component: PromotionDashboardComponent;
  let fixture: ComponentFixture<PromotionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
