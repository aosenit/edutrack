import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSheetDetailsPageComponent } from './score-sheet-details-page.component';

describe('ScoreSheetDetailsPageComponent', () => {
  let component: ScoreSheetDetailsPageComponent;
  let fixture: ComponentFixture<ScoreSheetDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreSheetDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreSheetDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
