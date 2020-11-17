import { TestBed } from '@angular/core/testing';

import { ClassWorkService } from './class-work.service';

describe('ClassWorkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassWorkService = TestBed.get(ClassWorkService);
    expect(service).toBeTruthy();
  });
});
