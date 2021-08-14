import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniTranscriptComponent } from './alumni-transcript.component';

describe('AlumniTranscriptComponent', () => {
  let component: AlumniTranscriptComponent;
  let fixture: ComponentFixture<AlumniTranscriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniTranscriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
