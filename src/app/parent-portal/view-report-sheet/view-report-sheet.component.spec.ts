import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportSheetComponent } from './view-report-sheet.component';

describe('ViewReportSheetComponent', () => {
  let component: ViewReportSheetComponent;
  let fixture: ComponentFixture<ViewReportSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
