import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountChartComponent } from './new-account-chart.component';

describe('NewAccountChartComponent', () => {
  let component: NewAccountChartComponent;
  let fixture: ComponentFixture<NewAccountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccountChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
