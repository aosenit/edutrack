import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolMediaComponent } from './school-media.component';

describe('SchoolMediaComponent', () => {
  let component: SchoolMediaComponent;
  let fixture: ComponentFixture<SchoolMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
