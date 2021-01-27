import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeComponentComponent } from './fee-component.component';

describe('FeeComponentComponent', () => {
  let component: FeeComponentComponent;
  let fixture: ComponentFixture<FeeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
