import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlumniCreateEventComponent } from './admin-alumni-create-event.component';

describe('AdminAlumniCreateEventComponent', () => {
  let component: AdminAlumniCreateEventComponent;
  let fixture: ComponentFixture<AdminAlumniCreateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlumniCreateEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlumniCreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
