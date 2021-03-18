import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
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
  termList: any;
  terms = [];
  sequenceCount = 0;
  toggleState = false;
  newComponent = [];
  newFee = true;
  editFee = false;
  editFeeForm: FormGroup;
  pageId: any;


  constructor(
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService,
    private classService: ClassService,
    private schoolSectionService: SchoolSectionService,
    private assessmentService: AssessmentService,
    private router: Router,
    private route: ActivatedRoute



  ) { }

  ngOnInit() {
    this.pageId = this.route.snapshot.params.id;

    this.populateFeeForm();
    this.populateEditFeeForm();
    this.getSession();
    this.getAllComponent();
    this.getAllFeeGroups();
    this.getAllSections();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.newFee = true;
      } else {
        // this.getProfileInformation();
        this.getFeeById();
        this.newFee = false;
        this.editFee = true;

      }
    });

  }

  populateFeeForm() {
    this.feeForm = this.fb.group({
      level: ['', Validators.required],
      name: ['', Validators.required],
      SchoolClassId: ['', Validators.required],
      FeeGroupId: ['', Validators.required],
      isActive: false,
      terms: ['', Validators.required],
      feeComponents: this.fb.array([this.createItem()])

    });
  }

  populateEditFeeForm() {
    this.editFeeForm = this.fb.group({
      level: ['', Validators.required],
      name: ['', Validators.required],
      SchoolClassId: ['', Validators.required],
      FeeGroupId: ['', Validators.required],
      isActive: false,
      terms: ['', Validators.required],
      feeComponents: this.fb.array([this.createItem()])

    });
  }


  getFeeById() {
    this.finance.getFeesById(this.pageId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        const terMs = data.payload.terms;
        const splitTerms = terMs.split(',');
        this.terms = [];
        splitTerms.forEach(v => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.termList.length; i++) {
            console.log(this.termList[i]);
            // tslint:disable-next-line:triple-equals
            if (this.termList[i].sequenceNumber == v) {
              console.log('yes');
              this.termList[i].checked = true;
              this.terms.push(v);
              console.log(this.terms);
              // console.log(this.hobbiesArray);
              // console.log(this.allHobbyList);
              // tslint:disable-next-line:no-unused-expression

            }
          }
        });
        this.editFeeForm.patchValue({
          level: data.payload.name,
          name: data.payload.name,
          SchoolClassId: data.payload.schoolClassId,
          FeeGroupId: data.payload.feeGroupId,
          isActive: data.payload.isActive,
          // feeComponents: data.payload.feeComponents
        });

        this.editFeeForm.setControl('feeComponents', this.setExistingComponent(data.payload.feeComponents));
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }


  setExistingComponent(data: any): FormArray {
    const fArray = new FormArray([]);
    data.forEach(element => {
      fArray.push(this.fb.group({
        ComponentId: element.componentId,
        amount: element.amount,
        isCompulsory: element.isCompulsory,
      }));
    });
    console.log(fArray);
    return fArray;
  }

  addComponent() {
    this.items = this.feeForm.get('feeComponents') as FormArray;
    this.items.push(this.createItem());

  }

  createItem(): FormGroup {
    return this.fb.group({
      ComponentId: '',
      amount: '',
      isCompulsory: false,
    });
  }

  getSession() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        const sessionList: any = data.payload;
        this.termList = sessionList.terms;
        console.log(this.terms);
      }
    });
  }

  getTerms(event, sequence) {
    if (event.target.checked === true) {
      this.terms.push(event.target.value);
      console.log(this.terms);
    } else {
      const index = this.terms.indexOf(`${sequence}`);
      if (index > -1) {
        this.terms.splice(index, 1);
        console.log(this.terms);
      }
      this.terms.filter((item) => item !== sequence);
    }
  }


  getClassBySectionId(id) {
    console.log(id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classes = data.payload;

      }
    });

  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

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
    console.log(this.feeForm.value);
    const { name, SchoolClassId, FeeGroupId, terms, feeComponents } = this.feeForm.value;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < feeComponents.length; i++) {
      console.log(feeComponents[i]);
      const { amount, ComponentId, isCompulsory } = feeComponents[i];
      const result2 = {
        amount,
        componentId: parseInt(ComponentId),
        isCompulsory
      };
      this.newComponent.push(result2);
    }
    const sequenceNumber = this.sequenceCount++;

    const term = this.terms.map((ids: any) => {
      return parseInt(ids);
    });
    const result = {
      name,
      // tslint:disable-next-line:radix
      feeGroupId: parseInt(FeeGroupId),
      // tslint:disable-next-line:radix
      schoolClassId: parseInt(SchoolClassId),
      terms: term,
      sequenceNumber,
      isActive: this.toggleState,
      feeComponents: this.newComponent


    };
    console.log(result);
    this.finance.createFee(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Successful', 'success', 1);
        this.feeForm.reset();
        this.router.navigateByUrl('/school/finance-setting/fee');
        // document.getElementById('mySubjectModal').click();
        // this.getAllComponent();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }

  editCreatedFee() {
    console.log(this.feeForm.value);
    const { name, SchoolClassId, FeeGroupId, terms, feeComponents } = this.editFeeForm.value;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < feeComponents.length; i++) {
      console.log(feeComponents[i]);
      const { amount, ComponentId, isCompulsory } = feeComponents[i];
      const result2 = {
        amount,
        componentId: parseInt(ComponentId),
        isCompulsory
      };
      this.newComponent.push(result2);
    }
    const sequenceNumber = this.sequenceCount++;

    const term = this.terms.map((ids: any) => {
      return parseInt(ids);
    });
    const result = {
      name,
      // tslint:disable-next-line:radix
      feeGroupId: parseInt(FeeGroupId),
      // tslint:disable-next-line:radix
      schoolClassId: parseInt(SchoolClassId),
      terms: term,
      sequenceNumber,
      isActive: this.toggleState,
      feeComponents: this.newComponent


    };
    console.log(result);
  }

  back() {
    window.history.back();
  }
}
