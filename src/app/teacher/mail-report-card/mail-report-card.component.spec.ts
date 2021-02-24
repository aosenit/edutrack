import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailReportCardComponent } from './mail-report-card.component';

describe('MailReportCardComponent', () => {
  let component: MailReportCardComponent;
  let fixture: ComponentFixture<MailReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailReportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
