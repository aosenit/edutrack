import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parse } from 'querystring';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { SubscriptionsService } from 'src/services/data/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css']
})
export class SubscriptionPageComponent implements OnInit {

  subscriptionForm: FormGroup;
  clientList: any;
  dropdownSettings = {};
  dropdownList = [];


  constructor(
    private fb: FormBuilder,
    private schoolServices: SchoolService,
    private subscriptionService: SubscriptionsService,
    private notifyService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initiatSubscriptionForm();
    this.getAllSchools();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  initiatSubscriptionForm() {
    this.subscriptionForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', Validators.required],
      studentCount: ['', Validators.required],
      schoolID: ['', Validators.required]
    });
  }

  getAllSchools() {
    this.schoolServices.getAllSchools(1, '').subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.clientList = data.payload;
        const arr = [];
        this.clientList.forEach(item => {
          arr.push({
            id: item.id,
            name: item.name
          });
        });
        this.dropdownList = arr;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  createSubscription() {
    const {startDate, endDate, price, studentCount, schoolID} = this.subscriptionForm.value;
    const schoolId = schoolID.map((name: any) => {
      return name.id;
    });
    const result = {
      startDate,
      endDate,
      pricePerStudent: parseInt(price),
      expectedNumberOfStudent: parseInt(studentCount),
      schoolId: parseInt(schoolId[0])
    };
    const payload = [];
    payload.push(result);
    console.log(result);
    this.subscriptionService.createNewSubscription(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notifyService.publishMessages(res.description, 'success', 1);
        this.router.navigateByUrl('/admin/subscription');
      } else {
        this.notifyService.publishMessages(res.errors, 'danger', 1);

      }
    });
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


  goBack() {
    window.history.back();
  }

}
