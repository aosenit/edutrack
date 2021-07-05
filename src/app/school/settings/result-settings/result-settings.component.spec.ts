import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSettingsComponent } from './result-settings.component';

describe('ResultSettingsComponent', () => {
  let component: ResultSettingsComponent;
  let fixture: ComponentFixture<ResultSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
