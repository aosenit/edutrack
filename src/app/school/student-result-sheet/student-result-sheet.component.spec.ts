import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResultSheetComponent } from './student-result-sheet.component';

describe('StudentResultSheetComponent', () => {
  let component: StudentResultSheetComponent;
  let fixture: ComponentFixture<StudentResultSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentResultSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentResultSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
