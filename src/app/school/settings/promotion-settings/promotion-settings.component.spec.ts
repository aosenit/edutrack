import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionSettingsComponent } from './promotion-settings.component';

describe('PromotionSettingsComponent', () => {
  let component: PromotionSettingsComponent;
  let fixture: ComponentFixture<PromotionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
