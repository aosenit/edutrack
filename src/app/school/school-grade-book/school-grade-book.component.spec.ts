import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGradeBookComponent } from './school-grade-book.component';

describe('SchoolGradeBookComponent', () => {
  let component: SchoolGradeBookComponent;
  let fixture: ComponentFixture<SchoolGradeBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolGradeBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolGradeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
