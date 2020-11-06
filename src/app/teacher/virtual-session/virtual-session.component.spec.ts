import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualSessionComponent } from './virtual-session.component';

describe('VirtualSessionComponent', () => {
  let component: VirtualSessionComponent;
  let fixture: ComponentFixture<VirtualSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
