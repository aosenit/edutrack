import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniAlumniComponent } from './alumni-alumni.component';

describe('AlumniAlumniComponent', () => {
  let component: AlumniAlumniComponent;
  let fixture: ComponentFixture<AlumniAlumniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniAlumniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
