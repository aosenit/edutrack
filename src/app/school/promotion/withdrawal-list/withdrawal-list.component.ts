import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { PromotionService } from 'src/services/data/promotion/promotion.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
@Component({
  selector: 'app-withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrls: ['./withdrawal-list.component.css']
})
export class WithdrawalListComponent implements OnInit {
  previous = true;
  continue = false;
  withdrawalForm: FormGroup;
  withdrawalList: any;
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
    this.initWithdrawalForm();
    // this.getWithdrwalList();
    this.getAllLevels();
    this.getCurrentSession();
  }

  initWithdrawalForm() {
    this.withdrawalForm = this.fb.group({
      reason: ['', Validators.required],
      Class: [''],
      level: [''],
    });
  }
  next(e) {
    if (e === 'yes') {
      this.previous = false;
      this.continue = true;
    } else {
      this.previous = true;
      this.continue = false;

    }
  }

  getAllLevels() {
    this.levelService.getSection().subscribe((res: any) => {
      if (res.hasErrors === false) {
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
        this.getWithdrwalList(this.currentSesion);
      }
    });
  }

  getWithdrwalList(id) {
    this.promotionService.getWithDrawnList(id, '').subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.withdrawalList = res.payload;
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
    this.promotionService.getWithDrawnList(this.currentSesion, event).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.noData = false;
        this.showData = true;
        this.withdrawalList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

  selectedStudentId(id) {

    console.log(id);
    this.selectedstudentId = id;
    // this.selectedStudentId = this.repeatList[i];

  }

  submitReason() {
    const results = [];
    const { reason, Class, level} = this.withdrawalForm.value;
    const result = {
      id: parseInt(this.selectedstudentId),
      studentName: null,
      regNumber: null,
      level,
      previousClass: null,
      average: 0,
      withdrawalReason: null,
      toClass: parseInt(Class),
      status: 4,
      reInstateReason: reason
    };
    results.push(result);
    this.promotionService.postReasons(results).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notificationService.publishMessages('Successful', 'success', 1);
        document.getElementById('closeModal').click();
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }

}
