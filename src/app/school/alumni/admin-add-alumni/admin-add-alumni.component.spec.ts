import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAlumniComponent } from './admin-add-alumni.component';

describe('AdminAddAlumniComponent', () => {
  let component: AdminAddAlumniComponent;
  let fixture: ComponentFixture<AdminAddAlumniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddAlumniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
