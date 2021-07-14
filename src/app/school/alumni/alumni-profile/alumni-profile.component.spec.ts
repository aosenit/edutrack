import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniProfileComponent } from './alumni-profile.component';

describe('AlumniProfileComponent', () => {
  let component: AlumniProfileComponent;
  let fixture: ComponentFixture<AlumniProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
