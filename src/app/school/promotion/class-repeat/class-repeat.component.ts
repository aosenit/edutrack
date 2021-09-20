import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { PromotionService } from 'src/services/data/promotion/promotion.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';

@Component({
  selector: 'app-class-repeat',
  templateUrl: './class-repeat.component.html',
  styleUrls: ['./class-repeat.component.css']
})
export class ClassRepeatComponent implements OnInit {
  previous = true;
  continue = false;
  promoteOntrialForm: FormGroup;
  withdrawalForm: FormGroup;
  repeatList: any;
  levels: any;
  currentSesion: any;
  classList: any;
  constructor(
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private notificationService: NotificationsService,
    private assessment: AssessmentService,
    private levelService: SchoolSectionService,
    private classService: ClassService

  ) { }

  ngOnInit() {
    this.getAllLevels();
    this.getCurrentSession();
    this.initPromoteOntrialForm();
    this.initWithdrawalForm();

  }

  initPromoteOntrialForm() {
    this.promoteOntrialForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  initWithdrawalForm() {
    this.withdrawalForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  getAllLevels() {
    this.levelService.getSection().subscribe((res: any) => {
      if (res.hasErrors === false ) {
        this.levels = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }


  getCurrentSession() {
    this.assessment.getCurrentSession().subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.currentSesion = res.payload.id;
        console.log(this.currentSesion);
        this.getRepeatList(this.currentSesion);
      }
    });
  }

  getRepeatList(id) {
    this.promotionService.getRepeatersList(id, '').subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.repeatList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

  getClasseInLevel(event) {
    this.classService.getClassBySection(event).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.classList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }

  sortByClass(event) {
    this.promotionService.getRepeatersList(this.currentSesion, event).subscribe((res: any) => {
      if (res.hasErrors === false ) {
        this.repeatList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

}

