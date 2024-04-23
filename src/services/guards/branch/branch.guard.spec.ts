import { TestBed, async, inject } from '@angular/core/testing';

import { BranchGuard } from './branch.guard';

describe('BranchGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchGuard]
    });
  });

  it('should ...', inject([BranchGuard], (guard: BranchGuard) => {
    expect(guard).toBeTruthy();
  }));
});
