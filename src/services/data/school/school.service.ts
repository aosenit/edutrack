import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addschool: 'schtrack-auth/api/v1/School/AddSchool ',
  getallschool: 'schtrack-auth/api/v1/School/GetSchools',
  // getallschool: 'api/v1/School/GetSchools?PageIndex=1&PageSize=10',
  getschoolbyid: 'schtrack-auth/api/v1/School/GetSchool',
  bulkUplaod: 'schtrack-auth/api/v1/School/BulkAddSchool',
  updateschoolbyid: 'schtrack-auth/api/v1/School/UpdateSchool',
  deleteschool: 'schtrack-auth/api/v1/School/DeleteSchool'
};

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }


  addSchool(schoolFinalStep) {
    const formData = new FormData();
    formData.append('Name', schoolFinalStep.Name);
    formData.append('DomainName', schoolFinalStep.DomainName);
    formData.append('WebsiteAddress', schoolFinalStep.WebsiteAddress);
    formData.append('Files', schoolFinalStep.logo);
    formData.append('Files', schoolFinalStep.icon);
    // formData.append('DocumentTypes', schoolFinalStep.DocumentTypes);
    schoolFinalStep.DocumentTypes.forEach((item) => formData.append('DocumentTypes', item));
    formData.append('Country', schoolFinalStep.Country);
    formData.append('Address', schoolFinalStep.Address);
    formData.append('State', schoolFinalStep.State);
    formData.append('City', schoolFinalStep.City);
    formData.append('ContactFirstName', schoolFinalStep.ContactFirstName);
    formData.append('ContactLastName', schoolFinalStep.ContactLastName);
    formData.append('ContactPhoneNo', schoolFinalStep.ContactPhoneNo);
    formData.append('ContactEmail', schoolFinalStep.ContactEmail);
    const url = `${this.baseUrl + routes.addschool}`;
    // console.log('asasas', schoolFinalStep);
    return this.http.post(url, formData);
  }

  getAllSchools( p, perpage ) {
    // const url = `${this.baseUrl + routes.getallschool}`;
    const url = `${this.baseUrl + routes.getallschool}?PageIndex=${p}&PageSize=${perpage}`;

    return this.http.get(url);
  }

  getSchoolById(id) {
    const url = `${this.baseUrl + routes.getschoolbyid}/${id}`;
    return this.http.get(url, id);
  }

  uploadBulkDocument(bulkUpload) {
    const formData = new FormData();
    formData.append('File', bulkUpload.bulkFile);
    const url = `${this.baseUrl + routes.bulkUplaod}`;
    return this.http.post(url, formData);
  }

  updateSchool(id, updateSchoolForm) {
    const formData = new FormData();
    formData.append('Name', updateSchoolForm.Name);
    formData.append('DomainName', updateSchoolForm.DomainName);
    formData.append('WebsiteAddress', updateSchoolForm.WebsiteAddress);
    formData.append('Files', updateSchoolForm.logo);
    formData.append('Files', updateSchoolForm.icon);
    // formData.append('DocumentTypes', updateSchoolForm.DocumentTypes);
    updateSchoolForm.DocumentTypes.forEach((item) => formData.append('DocumentTypes', item));
    formData.append('Country', updateSchoolForm.Country);
    formData.append('Address', updateSchoolForm.Address);
    formData.append('State', updateSchoolForm.State);
    formData.append('City', updateSchoolForm.City);
    formData.append('ContactFirstName', updateSchoolForm.ContactFirstName);
    formData.append('ContactLastName', updateSchoolForm.ContactLastName);
    formData.append('ContactPhoneNo', updateSchoolForm.ContactPhoneNo);
    formData.append('ContactEmail', updateSchoolForm.ContactEmail);
    const url = `${this.baseUrl + routes.updateschoolbyid}/${id}`;
    return this.http.put(url, formData);

  }

  deleteSchoolById(userid) {
    const url = `${this.baseUrl + routes.deleteschool}/${userid}`;
    return this.http.delete(url);

  }
}
