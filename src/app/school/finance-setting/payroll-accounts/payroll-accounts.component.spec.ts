import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAccountsComponent } from './payroll-accounts.component';

describe('PayrollAccountsComponent', () => {
  let component: PayrollAccountsComponent;
  let fixture: ComponentFixture<PayrollAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
