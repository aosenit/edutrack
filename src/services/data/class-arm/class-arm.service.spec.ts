import { TestBed } from '@angular/core/testing';

import { ClassArmService } from './class-arm.service';

describe('ClassArmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassArmService = TestBed.get(ClassArmService);
    expect(service).toBeTruthy();
  });
});
