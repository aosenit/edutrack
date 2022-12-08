import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolManagerBranchComponent } from './school-manager-branch.component';

describe('SchoolManagerBranchComponent', () => {
  let component: SchoolManagerBranchComponent;
  let fixture: ComponentFixture<SchoolManagerBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolManagerBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolManagerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
