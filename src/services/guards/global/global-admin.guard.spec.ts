import { TestBed, async, inject } from '@angular/core/testing';

import { GlobalAdminGuard } from './global-admin.guard';

describe('GlobalAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalAdminGuard]
    });
  });

  it('should ...', inject([GlobalAdminGuard], (guard: GlobalAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
