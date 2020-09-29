import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoleScheduleComponent } from './new-role-schedule.component';

describe('NewRoleScheduleComponent', () => {
  let component: NewRoleScheduleComponent;
  let fixture: ComponentFixture<NewRoleScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoleScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoleScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
