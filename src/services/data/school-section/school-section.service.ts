import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
    const tenantId = '1';
    const body = new FormData();
    body.append('name', name);
    // return this.http.post(this.baseUrl2 + 'api/v1/SchoolSection/AddSection', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } });
    return this.http.post(this.baseUrl2 + 'api/v1/SchoolSection/AddSection', body, { headers: { tenantId } });
  }
  getSection() {
    const tenantId = '1';
    return this.http.get(this.baseUrl2 + 'api/v1/SchoolSection/GetAllSections', { headers: { tenantId } });
  }
  updateSection(name) {
    const body = new FormData()
    body.append("name", name)
    return this.http.put(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/AddSection', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } });
  }

  deleteSection(id) {
    return this.http.delete(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/DeleteSection/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') } });
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
