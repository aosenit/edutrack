import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInformationComponent } from './branch-information.component';

describe('BranchInformationComponent', () => {
  let component: BranchInformationComponent;
  let fixture: ComponentFixture<BranchInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
