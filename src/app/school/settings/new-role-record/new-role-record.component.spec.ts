import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoleRecordComponent } from './new-role-record.component';

describe('NewRoleRecordComponent', () => {
  let component: NewRoleRecordComponent;
  let fixture: ComponentFixture<NewRoleRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRoleRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoleRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
