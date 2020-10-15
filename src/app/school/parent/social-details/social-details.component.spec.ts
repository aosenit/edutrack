import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialDetailsComponent } from './social-details.component';

describe('SocialDetailsComponent', () => {
  let component: SocialDetailsComponent;
  let fixture: ComponentFixture<SocialDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
