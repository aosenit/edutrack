import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SchoolService } from 'src/services/data/school/school.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GroupedSchoolsComponent } from '../grouped-schools.component';
import { NoSpaceValidator } from 'src/services/utils/noSpace';


@Component({
  selector: 'app-school-information',
  templateUrl: './school-information.component.html',
  styleUrls: ['./school-information.component.css']
})
export class SchoolInformationComponent implements OnInit {

  profileForm: FormGroup;
  profileInfo: any;
  id: any;
  schoolProfile: any;
  url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(
    private home: GroupedSchoolsComponent,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // // ('page id', this.id);
    this.createProfileForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.createProfileForm();
      } else {
        this.getProfileInformation();
      }
    });
    this.getAActiveTab();
  }


  nextStep() {
    this.home.stepper(2);
    sessionStorage.setItem('grouped-profile-info', JSON.stringify(this.profileForm.value));
  }

  createProfileForm() {
    this.profileForm = this.fb.group({

      Name: ['', Validators.required],
      DomainName: ['', [Validators.required, NoSpaceValidator.cannotContainSpace]],
      WebsiteAddress: ['', [Validators.required, Validators.pattern(this.url)]],
      // Username: ['', Validators.required],

    });
  }


  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('client-info'));
    // console.log('na the paylod', payload);
    // this.populateEditProfileForm(payload);
    this.profileForm.patchValue({

      Name: payload.name,
      DomainName: payload.domainName,
      WebsiteAddress: payload.websiteAddress,
      // Username: payload.userName
    });
  }


  getAActiveTab() {
    this.schoolProfile = JSON.parse(sessionStorage.getItem('grouped-profile-info'));

    if (sessionStorage.getItem('grouped-profile-info') !== null) {
      // console.log(`School profile exists`);
      this.profileForm.patchValue({

        Name: this.schoolProfile.Name,
        DomainName: this.schoolProfile.DomainName,
        WebsiteAddress: this.schoolProfile.WebsiteAddress,
        // Username: this.schoolProfile.Username

      });
    } else {
      // console.log(`School profile not found`);
    }

  }

  back() {
    window.history.back();
  }

}
