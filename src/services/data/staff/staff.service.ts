import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addstaff: 'api/v1/Staff/AddStaff',
  getallstaff: 'v1/Staff/GetAllStaffInSchool',
  getstaffbyid: 'schtrack-auth/api/v1/Staff/GetStaffById',
  updatestaffbyid: 'schtrack-auth/api/v1/Staff/UpdateStaff',
  deletestaff: 'schtrack-auth/api/v1/Staff/DeleteStaff'
};


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  addStaff(form) {
    const tenantId = '1'; // just a temporary header till email services is ready
    const {EducationExperienceVMs, WorkExperienceVMs} = form;
    const body = new FormData();
    body.append('Address', form.Address );
    body.append('LastName', form.LastName );
    body.append('OtherNames', form.OtherNames );
    form.DocumentTypes.forEach((item) => body.append('DocumentTypes', item));
    body.append('BloodGroup', form.BloodGroup );
    body.append('Town', form.Town );
    body.append('contactAltEmail', form.contactAltEmail );
    body.append('AltEmailAddress', form.AltEmailAddress );
    body.append('EmailAddress', form.EmailAddress );
    body.append('FirstName', form.FirstName );
    body.append('PhoneNumber', form.PhoneNumber );
    body.append('Country', form.Country );
    body.append('EmploymentDetails.DepartmentId', form.DepartmentId );
    body.append('DateOfBirth', form.DateOfBirth );
    body.append('EmploymentDetails.EmploymentDate', form.EmploymentDate );
    body.append('EmploymentDetails.EmployementStatus', form.EmployementStatus );
    body.append('EmploymentDetails.JobTitle', form.JobTitle );
    body.append('LocalGovernment', form.LocalGovernment );
    body.append('MaritalStatus', form.MaritalStatus );
    body.append('Nationality', form.Nationality );
    body.append('NextOfKin.NextKinAddress', form.NextKinAddress );
    body.append('NextOfKin.NextKinCity', form.NextKinCity );
    body.append('NextOfKin.NextKinCountry', form.NextKinCountry );
    body.append('NextOfKin.NextKinFirstName', form.NextKinLastName );
    body.append('NextOfKin.NextKinLastName', form.NextKinLastName );
    body.append('NextOfKin.NextKinOccupation', form.NextKinOccupation );
    body.append('NextOfKin.NextKinOtherName', form.NextKinOtherName );
    body.append('NextOfKin.NextKinPhone', form.NextKinPhone );
    body.append('NextOfKin.NextKinRelationship', form.NextKinRelationship );
    body.append('NextOfKin.NextKinState', form.NextKinState );
    body.append('EmploymentDetails.PayGrade', form.PayGrade );
    body.append('EmploymentDetails.HighestQualification', form.HighestQualification );
    body.append('Religion', form.Religion );
    body.append('EmploymentDetails.ResumptionDate', form.ResumptionDate );
    body.append('Sex', form.Sex );
    body.append('Files', form.signature);
    body.append('Files', form.profile);
    body.append('EmploymentDetails.StaffType', form.StaffType );
    body.append('StateOfOrigin', form.StateOfOrigin );
    body.append('IsActive', form.IsActive );
    for (let i = 0; i < WorkExperienceVMs.length; i++ ) {
      body.append('WorkExperienceVMs[' + i + '].workRole', WorkExperienceVMs[i].workRole );
      body.append('WorkExperienceVMs[' + i + '].workCompanyName', WorkExperienceVMs[i].workCompanyName );
      body.append('WorkExperienceVMs[' + i + '].startTime', WorkExperienceVMs[i].startTime );
      body.append('WorkExperienceVMs[' + i + '].endTime', WorkExperienceVMs[i].endTime );
    }
    for (let i = 0; i < EducationExperienceVMs.length; i++ ) {
      body.append('EducationExperienceVMs[' + i + '].educationSchoolName', EducationExperienceVMs[i].educationSchoolName );
      // tslint:disable-next-line:max-line-length
      body.append('EducationExperienceVMs[' + i + '].educationSchoolQualification', EducationExperienceVMs[i].educationSchoolQualification );
      body.append('EducationExperienceVMs[' + i + '].startDate', EducationExperienceVMs[i].startDate );
      body.append('EducationExperienceVMs[' + i + '].endDate', EducationExperienceVMs[i].endDate );
    }
    const url = `${this.baseUrl2 + routes.addstaff}`;
    console.log(url);
    console.log(body);
    return this.http.post(url, body, { headers: { tenantId } } );
  }

  getAllStaffInSchool() {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl2 + routes.getallstaff}`;
    return this.http.get(url, { headers: { tenantId } });

  }

  getStaffById(id) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getstaffbyid}/${id}`;

    return this.http.get(url, { headers: { tenantId } });


  }

  updateStaff(id, updateForm) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl +  routes.updatestaffbyid}/${id}`;
    return this.http.put(url, updateForm, { headers: { tenantId } });

  }

  deleteStaffById(id) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.deletestaff}/${id}`;
    return this.http.delete(url, { headers: { tenantId } });

  }

}
