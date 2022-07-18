import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlumniListComponent } from './admin-alumni-list.component';

describe('AdminAlumniListComponent', () => {
  let component: AdminAlumniListComponent;
  let fixture: ComponentFixture<AdminAlumniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlumniListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlumniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
