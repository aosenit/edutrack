import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollSetttingsComponent } from './payroll-setttings.component';

describe('PayrollSetttingsComponent', () => {
  let component: PayrollSetttingsComponent;
  let fixture: ComponentFixture<PayrollSetttingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollSetttingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollSetttingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
