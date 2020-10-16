import { TestBed } from '@angular/core/testing';

import { SchoolSectionService } from './school-section.service';

describe('SchoolSectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolSectionService = TestBed.get(SchoolSectionService);
    expect(service).toBeTruthy();
  });
});
