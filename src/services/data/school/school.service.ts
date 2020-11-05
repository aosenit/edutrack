import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addschool: 'api/v1/School/AddSchool ',
  getallschool: 'schtrack-auth/api/v1/School/GetSchools',
  // getallschool: 'api/v1/School/GetSchools?PageIndex=1&PageSize=10',
  getschoolbyid: 'api/v1/School/GetSchool',
  bulkUplaod: 'api/v1/School/BulkAddSchool',
  updateschoolbyid: 'School/UpdateSchool',
  deleteschool: 'School/DeleteSchool'
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
    const url = `${this.baseUrl2 + routes.addschool}`;
    // console.log('asasas', schoolFinalStep);
    return this.http.post(url, formData);
  }

  getAllSchools() {
    const url = `${this.baseUrl + routes.getallschool}`;
    return this.http.get(url);
  }

  getSchoolById(id) {
    const url = `${this.baseUrl2 + routes.getschoolbyid}/${id}`;
    return this.http.get(url, id);
  }

  uploadBulkDocument(bulkUpload) {
    const formData = new FormData();
    formData.append('File', bulkUpload.avatar);
    const url = `${this.baseUrl2 + routes.bulkUplaod}`;
    return this.http.post(url, bulkUpload);
  }

  updateSchool(id, updateSchoolForm) {
    const url = `${this.baseUrl + routes.updateschoolbyid}/${id}`;
    return this.http.put(url, updateSchoolForm);

  }

  deleteSchoolById(userid) {
    const url = `${this.baseUrl + routes.deleteschool}/${userid}`;
    return this.http.delete(url);

  }
}
