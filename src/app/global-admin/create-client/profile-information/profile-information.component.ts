import { Component, OnInit } from '@angular/core';
import { CreateClientComponent } from '../create-client.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SchoolService } from 'src/services/data/school/school.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NoSpaceValidator } from 'src/services/utils/noSpace';


@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  profileForm: FormGroup;
  profileInfo: any;
  id: any;
  schoolProfile: any;

  constructor(
    private home: CreateClientComponent,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private schoolServices: SchoolService,
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
    sessionStorage.setItem('profile-info', JSON.stringify(this.profileForm.value));
  }

  createProfileForm() {
    this.profileForm = this.fb.group({

      Name: ['', Validators.required],
      DomainName: ['', [Validators.required, NoSpaceValidator.cannotContainSpace]],
      WebsiteAddress: ['', Validators.required],
      Username: ['', Validators.required],

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
      Username: payload.userName
    });
  }

  populateEditProfileForm() {
    this.schoolProfile = JSON.parse(sessionStorage.getItem('client-info'));
    this.profileForm.patchValue({

      Name: this.schoolProfile.name,
      DomainName: this.schoolProfile.domainName,
      WebsiteAddress: this.schoolProfile.websiteAddress,
      Username: this.schoolProfile.userName
    });
  }

  getAActiveTab() {
    this.schoolProfile = JSON.parse(sessionStorage.getItem('profile-info'));

    if (sessionStorage.getItem('profile-info') !== null) {
      // console.log(`School profile exists`);
      this.profileForm.patchValue({

        Name: this.schoolProfile.Name,
        DomainName: this.schoolProfile.DomainName,
        WebsiteAddress: this.schoolProfile.WebsiteAddress,
        Username: this.schoolProfile.Username

      });
    } else {
      // console.log(`School profile not found`);
    }

  }


  back() {
    window.history.back();
  }
}
