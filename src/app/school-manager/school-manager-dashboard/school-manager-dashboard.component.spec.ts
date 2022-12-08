import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolManagerDashboardComponent } from './school-manager-dashboard.component';

describe('SchoolManagerDashboardComponent', () => {
  let component: SchoolManagerDashboardComponent;
  let fixture: ComponentFixture<SchoolManagerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolManagerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
