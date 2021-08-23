import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedSchoolsComponent } from './grouped-schools.component';

describe('GroupedSchoolsComponent', () => {
  let component: GroupedSchoolsComponent;
  let fixture: ComponentFixture<GroupedSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
