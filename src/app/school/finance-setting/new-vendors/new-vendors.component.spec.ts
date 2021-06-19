import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVendorsComponent } from './new-vendors.component';

describe('NewVendorsComponent', () => {
  let component: NewVendorsComponent;
  let fixture: ComponentFixture<NewVendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
