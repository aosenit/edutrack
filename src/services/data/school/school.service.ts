import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addschool: '/School/AddSchool ',
  getallschool: '/School/GetSchools',
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
    const url = `${this.baseUrl + routes.addschool}`;
    return this.http.post(url, schoolFinalStep, {responseType: 'text'});
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
