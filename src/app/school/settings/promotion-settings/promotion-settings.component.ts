import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-settings',
  templateUrl: './promotion-settings.component.html',
  styleUrls: ['./promotion-settings.component.css']
})
export class PromotionSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  allowNumbersOnly(e) {
    const ev = e || window.event;
    const charcode = ev.which ? ev.which : ev.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57) && charcode !== 46) {
      e.preventDefault();
      return false;
    }
    return true;
  }
}
