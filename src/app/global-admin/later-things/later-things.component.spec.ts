import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaterThingsComponent } from './later-things.component';

describe('LaterThingsComponent', () => {
  let component: LaterThingsComponent;
  let fixture: ComponentFixture<LaterThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaterThingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaterThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
