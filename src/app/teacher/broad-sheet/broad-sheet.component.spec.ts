import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadSheetComponent } from './broad-sheet.component';

describe('BroadSheetComponent', () => {
  let component: BroadSheetComponent;
  let fixture: ComponentFixture<BroadSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
