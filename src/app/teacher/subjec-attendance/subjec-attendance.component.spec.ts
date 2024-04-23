import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjecAttendanceComponent } from './subjec-attendance.component';

describe('SubjecAttendanceComponent', () => {
  let component: SubjecAttendanceComponent;
  let fixture: ComponentFixture<SubjecAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjecAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjecAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
