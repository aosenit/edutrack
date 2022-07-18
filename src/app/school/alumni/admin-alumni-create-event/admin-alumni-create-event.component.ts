import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AlumniService } from 'src/services/data/alumni/alumni.service';

@Component({
  selector: 'app-admin-alumni-create-event',
  templateUrl: './admin-alumni-create-event.component.html',
  styleUrls: ['./admin-alumni-create-event.component.css']
})
export class AdminAlumniCreateEventComponent implements OnInit {
newAlumniform: FormGroup;
imageSrc: any;
profileImageName = null;
  eventType: string;
newEvent = true;
editEvent = false;
  pageId: any;
  editAlumniform: FormGroup;
  checkEventType = false;

  constructor(
    private alumni: AlumniService,
    private fb: FormBuilder,
    private notifyService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute


  ) { }

  ngOnInit() {

    this.newAlumniform = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      status: true,
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      eventImg: null
    });


    this.pageId = this.route.snapshot.params.id;


    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.newEvent = true;
      } else {
        // this.getProfileInformation();
        this.getEventByid();
        this.newEvent = false;
        this.editEvent = true;

        this.editAlumniform = this.fb.group({
          name: [''],
          type: [''],
          location: [''],
          startDate: [''],
          status: true,
          endDate: [''],
          description: [''],
          tags: [''],
          eventImg: [null]
        });
      }
    });
  }

  back() {
    window.history.back();
  }

  getEventType(event) {
    if (event === true) {
      this.eventType = 'Virtual';
    } else {
      this.eventType = 'Physical';
    }
  }

  handleFileInput(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      // console.log('file', file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.newAlumniform.patchValue({
          fileSource: reader.result
        });
      };
      this.profileImageName = file.name;
      // console.log(this.DocumentTypes);

      this.newAlumniform.get('eventImg').setValue(file);

      const size = event.target.files[0].size;
      if (size >=  1048576 ) {
        this.notifyService.publishMessages('File size too large', 'danger', 1);
      }
    }
  }


  createEvent() {
    const {name, type, location, startDate, status, endDate, description, tags, eventImg} = this.newAlumniform.value;
    // const time = startDate + ' ' + startTime;
    const tag = tags.split(',');

    // console.log()
    const payload = {
      name,
      type: this.eventType,
      location,
      startDate,
      status,
      endDate,
      description,
      tags: tag,
      eventImg
    };
    console.log(payload);
    this.alumni.createEvent(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res);
        this.notifyService.publishMessages(res.description, 'success', 1);
        this.router.navigateByUrl('/school/alumni-events');
      } else {
        this.notifyService.publishMessages(res.description, 'danger', 1);

      }
    });
  }

  getEventByid() {
    this.alumni.getAllAlumniEventId(this.pageId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res);
        this.populateEditForm(res.payload);
      }
    });
  }

  populateEditForm(payload) {
    if (payload.type === 'Virtual') {
      this.checkEventType = true;
    } else {
      this.checkEventType = false;
    }
    this.editAlumniform.patchValue({
      name: payload.name,
          location: payload.location,
          startDate: moment(payload.startDate).format('YYYY-MM-DDThh:mm') ,
          endDate: moment(payload.endDate).format('YYYY-MM-DD'),
          description: payload.description,
          tags: payload.tags,
          eventImg: null
    });
  }


  updateEvent() {
    const {name, type, location, startDate, status, endDate, description, tags, eventImg} = this.editAlumniform.value;
    // const time = startDate + ' ' + startTime;
    const tag = tags.split(',');

    // console.log()
    const payload = {
      name,
      type: this.eventType,
      location,
      startDate,
      status,
      endDate,
      description,
      tags: tag,
      eventImg
    };
    console.log(payload);
    this.alumni.updateEvent(this.pageId, payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res);
        this.notifyService.publishMessages(res.description, 'success', 1);
        this.router.navigateByUrl('/school/alumni-events');
      } else {
        this.notifyService.publishMessages(res.description, 'danger', 1);

      }
    });
  }



}
