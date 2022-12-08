import { TestBed, async, inject } from '@angular/core/testing';

import { SchoolGuard } from './school.guard';

describe('SchoolGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolGuard]
    });
  });

  it('should ...', inject([SchoolGuard], (guard: SchoolGuard) => {
    expect(guard).toBeTruthy();
  }));
});
