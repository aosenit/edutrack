import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlumniEventsComponent } from './admin-alumni-events.component';

describe('AdminAlumniEventsComponent', () => {
  let component: AdminAlumniEventsComponent;
  let fixture: ComponentFixture<AdminAlumniEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlumniEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlumniEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
