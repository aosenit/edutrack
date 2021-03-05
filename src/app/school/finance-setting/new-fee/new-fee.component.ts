import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ClassService } from 'src/services/data/class/class.service';
import { FinanceService } from 'src/services/data/finance/finance.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';

@Component({
  selector: 'app-new-fee',
  templateUrl: './new-fee.component.html',
  styleUrls: ['./new-fee.component.css']
})
export class NewFeeComponent implements OnInit {
  feeForm: FormGroup;
  items: any;
  feeGroupList: any;
  components: any;
  classes: any;
  sections: any;


  constructor(
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService,
    private classService: ClassService,
    private schoolSectionService: SchoolSectionService,


  ) { }

  ngOnInit() {
    this.populateFeeForm();
    this.getAllComponent();
    this.getAllFeeGroups();
    this.getAllSections();

  }

  populateFeeForm() {
    this.feeForm = this.fb.group({
      name: ['', Validators.required],
      schoolClassId: ['', Validators.required],
      feeGroupId: ['', Validators.required],
      isActive: false,
      feeComponents: this.fb.array([this.createItem()])

    });
  }

  addComponent() {
      this.items = this.feeForm.get('feeComponents') as FormArray;
      this.items.push(this.createItem());

  }

  createItem(): FormGroup {
    return this.fb.group({
      componentId: '',
      amount: '',
      isCompulsory: '',
    });
  }

  getClassBySectionId(id) {
    console.log(id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classes = data.payload;

        }
      });

  }

  getAllSections() {
    this.schoolSectionService.getSection().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }
  
  getAllComponent() {
    this.finance.getComponent().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.components = data.payload;
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  getAllFeeGroups() {
    this.finance.getAllFeeGroup().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.feeGroupList = data.payload;
        // this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Error occured', 'danger', 1);

    });
  }

  createNewFee() {
    console.log(this.feeForm.value)
  }

  back() {
    window.history.back();
  }
}
