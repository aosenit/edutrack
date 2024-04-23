import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRepeatComponent } from './class-repeat.component';

describe('ClassRepeatComponent', () => {
  let component: ClassRepeatComponent;
  let fixture: ComponentFixture<ClassRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
