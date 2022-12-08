import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchContactPersonComponent } from './branch-contact-person.component';

describe('BranchContactPersonComponent', () => {
  let component: BranchContactPersonComponent;
  let fixture: ComponentFixture<BranchContactPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchContactPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
