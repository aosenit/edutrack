import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentScoreSheetComponent } from './student-score-sheet.component';

describe('StudentScoreSheetComponent', () => {
  let component: StudentScoreSheetComponent;
  let fixture: ComponentFixture<StudentScoreSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentScoreSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentScoreSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
