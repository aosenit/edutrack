import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniHomeComponent } from './alumni-home.component';

describe('AlumniHomeComponent', () => {
  let component: AlumniHomeComponent;
  let fixture: ComponentFixture<AlumniHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
