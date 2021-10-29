import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniEventsComponent } from './alumni-events.component';

describe('AlumniEventsComponent', () => {
  let component: AlumniEventsComponent;
  let fixture: ComponentFixture<AlumniEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
