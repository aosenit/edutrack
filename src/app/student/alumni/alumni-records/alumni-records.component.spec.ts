import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniRecordsComponent } from './alumni-records.component';

describe('AlumniRecordsComponent', () => {
  let component: AlumniRecordsComponent;
  let fixture: ComponentFixture<AlumniRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
