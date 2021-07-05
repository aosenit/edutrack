import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolManagerSettingsComponent } from './school-manager-settings.component';

describe('SchoolManagerSettingsComponent', () => {
  let component: SchoolManagerSettingsComponent;
  let fixture: ComponentFixture<SchoolManagerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolManagerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolManagerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
