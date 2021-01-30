import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAssignmentComponent } from './child-assignment.component';

describe('ChildAssignmentComponent', () => {
  let component: ChildAssignmentComponent;
  let fixture: ComponentFixture<ChildAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
