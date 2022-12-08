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
  noData = true;
  showData = false;
  selectedstudentId: any;
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
      level: ['', Validators.required],
      Class: ['', Validators.required]
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
        this.getRepeatList(this.currentSesion);
      }
    });
  }

  getRepeatList(id) {
    this.promotionService.getRepeatersList(id).subscribe((res: any) => {
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
        this.noData = false;
        this.showData = true;
        this.repeatList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

  selectedStudentId(id, i) {

    this.selectedstudentId = id;
    // this.selectedStudentId = this.repeatList[i];

  }

  submitPromotionOnTrialReason() {
    const results = [];
    const { level, Class} = this.promoteOntrialForm.value;
    const result = {
      id: parseInt(this.selectedstudentId),
      studentName: null,
      regNumber: null,
      level,
      previousClass: null,
      average: 0,
      withdrawalReason: null,
      toClass: parseInt(Class),
      status: 0,
      reInstateReason: null
    };

    results.push(result);
    this.promotionService.postReasons(results).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notificationService.publishMessages('Successful', 'success', 1);
        document.getElementById('closeTrialModal').click();
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }


  submitWithDrawalReason() {
    const results = [];
    const { reason} = this.withdrawalForm.value;
    const result = {
      withdrawalReason: reason,
      status: 2,
    };
    console.log('withdrawal reason', result);
    results.push(result);
    this.promotionService.postReasons(results).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notificationService.publishMessages('Successful', 'success', 1);
        document.getElementById('closeWithdrawModal').click();
        
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }

}

