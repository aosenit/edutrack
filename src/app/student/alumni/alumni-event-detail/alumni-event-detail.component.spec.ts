import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniEventDetailComponent } from './alumni-event-detail.component';

describe('AlumniEventDetailComponent', () => {
  let component: AlumniEventDetailComponent;
  let fixture: ComponentFixture<AlumniEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
