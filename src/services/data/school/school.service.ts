import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addschool: 'schtrack-auth/api/v1/School/AddSchool ',
  getallschool: 'schtrack-auth/api/v1/School/GetSchools',
  getschoolbyid: 'School/GetSchool/',
  updateschoolbyid: 'School/UpdateSchool',
  deleteschool: 'School/DeleteSchool'
};

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addSchool(schoolFinalStep) {
    const formData = new FormData();
    formData.append('Name', schoolFinalStep.Name);
    formData.append('Name', schoolFinalStep.DomainName);
    formData.append('Name', schoolFinalStep.WebsiteAddress);
    formData.append('Name', schoolFinalStep.icon);
    formData.append('Name', schoolFinalStep.logo);
    formData.append('Name', schoolFinalStep.Country);
    formData.append('Name', schoolFinalStep.Address);
    formData.append('Name', schoolFinalStep.State);
    formData.append('Name', schoolFinalStep.City);
    formData.append('Name', schoolFinalStep.ContactFirstName);
    formData.append('Name', schoolFinalStep.ContactLastName);
    formData.append('Name', schoolFinalStep.ContactPhoneNo);
    formData.append('Name', schoolFinalStep.ContactEmail);
    const url = `${this.baseUrl + routes.addschool}`;
    console.log('asasas', schoolFinalStep);
    return this.http.post(url, formData);
  }

  getAllSchools() {
    const url = `${this.baseUrl + routes.getallschool}`;
    return this.http.get(url);
  }

  getSchoolById(id) {
    const url = `${this.baseUrl + routes.getschoolbyid}/${id}`;
    return this.http.get(url, id);
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
