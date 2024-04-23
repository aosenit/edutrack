import { TestBed } from '@angular/core/testing';

import { LessonNoteService } from './lesson-note.service';

describe('LessonNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonNoteService = TestBed.get(LessonNoteService);
    expect(service).toBeTruthy();
  });
});
