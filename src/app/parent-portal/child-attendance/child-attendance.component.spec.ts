import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAttendanceComponent } from './child-attendance.component';

describe('ChildAttendanceComponent', () => {
  let component: ChildAttendanceComponent;
  let fixture: ComponentFixture<ChildAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
