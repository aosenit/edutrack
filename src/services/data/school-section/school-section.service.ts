import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const tenantId = '1';

// const routes = {
//   addschoolLevel: 'schtrack-auth/api/v1/SchoolSection/AddSection',
//   getallSchoolLevels: 'schtrack-auth/api/v1/SchoolSection/GetAllSections',
//   updateclassarm: 'ClassArm/UpdateClassArm',
//   deleteclassarm: 'ClassArm/DeleteClassArm'
// };

@Injectable({
  providedIn: 'root'
})
export class SchoolSectionService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addSection(name) {
    const body = new FormData();
    body.append('name', name);
    return this.http.post(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/AddSection', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getSection() {
    return this.http.get(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/GetAllSections', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }
  getSectionById(id){
    return this.http.get(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/GetSectionById/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  updateSection(id, name) {
    const body = new FormData();
    body.append('Id', id);
    body.append('Name', name);
    return this.http.put(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/UpdateSection', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  deleteSection(id) {
    return this.http.delete(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/DeleteSection/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }
  // addlevel(levelForm) {
  //   const url = `${this.baseUrl + routes.addschoolLevel}`;
  //   return this.http.post(url, levelForm);
  // }

  // getLevels() {
  //   const tenantId = '1';
  //   const url = `${this.baseUrl + routes.getallSchoolLevels}`;
  //   return this.http.get(url, { headers: { tenantId } });

  // }
}
