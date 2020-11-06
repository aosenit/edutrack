import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addstaff: 'schtrack-auth/api/v1/Staff/AddStaff',
  getallstaff: 'schtrack-auth/api/v1/Staff/GetAllStaffInSchool',
  getstaffbyid: 'schtrack-auth/api/v1/Staff/GetStaffById',
  updatestaffbyid: 'schtrack-auth/api/v1/Staff/UpdateStaff',
  deletestaff: 'schtrack-auth/api/v1/Staff/DeleteStaff'
};


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addStaff(form) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const body = new FormData();
    body.append('Address', form.Address );
    body.append('ContactLastName', form.ContactLastName );
    body.append('ContactOtherName', form.ContactOtherName );
    form.DocumentTypes.forEach((item) => body.append('DocumentTypes', item));
    body.append('bloodGroup', form.bloodGroup );
    body.append('city', form.city );
    body.append('contactAltEmail', form.contactAltEmail );
    body.append('contactAltPhone', form.contactAltPhone );
    body.append('contactEmail', form.contactEmail );
    body.append('contactFirstName', form.contactFirstName );
    body.append('contactPhone', form.contactPhone );
    body.append('country', form.country );
    body.append('department', form.department );
    body.append('dob', form.dob );
    body.append('employementDate', form.employementDate );
    body.append('employementStatus', form.employementStatus );
    body.append('experienceFrom', form.experienceFrom );
    body.append('experienceTo', form.experienceTo );
    body.append('jobTitle', form.jobTitle );
    body.append('lga', form.lga );
    body.append('maritalStatus', form.maritalStatus );
    body.append('nationality', form.nationality );
    body.append('nextKinAddress', form.nextKinAddress );
    body.append('nextKinCity', form.nextKinCity );
    body.append('nextKinCountry', form.nextKinCountry );
    body.append('nextKinFirstName', form.nextKinLastName );
    body.append('nextKinLastName', form.nextKinLastName );
    body.append('nextKinOccupation', form.nextKinOccupation );
    body.append('nextKinOtherName', form.nextKinOtherName );
    body.append('nextKinPhone', form.nextKinPhone );
    body.append('nextKinRelationship', form.nextKinRelationship );
    body.append('nextKinState', form.nextKinState );
    body.append('payGrade', form.payGrade );
    body.append('profile', form.profile);
    body.append('qualification', form.qualification );
    body.append('religion', form.religion );
    body.append('resumptionDate', form.resumptionDate );
    body.append('schoolCountry', form.schoolCountry );
    body.append('schoolName', form.schoolName );
    body.append('schoolType', form.schoolType );
    body.append('sex', form.sex );
    body.append('signature', form.signature);
    body.append('staffType', form.staffType );
    body.append('state', form.state );
    body.append('status', form.status );
    body.append('workCompany', form.workCompany );
    body.append('workRole', form.workRole );
    const url = `${this.baseUrl + routes.addstaff}`;
    console.log(url);
    console.log(body);
    return this.http.post(url, body, { headers: { tenantId } } );
  }

  getAllStaffInSchool() {
    const url = `${this.baseUrl + routes.getallstaff}`;
    return this.http.get(this.baseUrl);

  }

  getStaffById(id) {
    const url = `${this.baseUrl + routes.getstaffbyid}/${id}`;
    return this.http.get(id);

  }

  updateStaff(id, updateForm) {
    const url = `${this.baseUrl +  routes.updatestaffbyid}/${id}`;
    return this.http.put(url, updateForm);

  }

  deleteStaffById(id) {
    const url = `${this.baseUrl + routes.deletestaff}/${id}`;
    return this.http.delete(url);

  }

}
