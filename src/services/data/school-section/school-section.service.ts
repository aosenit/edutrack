import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const routes = {
  editlevel: 'schtrack-auth/api/v1/SchoolSection/UpdateSection'
};

@Injectable({
  providedIn: 'root'
})
export class SchoolSectionService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addSection(Name) {
    return this.http.post(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/AddSection', Name, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getSection() {
    return this.http.get(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/GetAllSections', { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  getSectionById(id) {
    return this.http.get(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/GetSectionById/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  updateSection(id, result) {
    const url = `${this.baseUrl + routes.editlevel}/${id}`;
    return this.http.put(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  deleteSection(id) {
    return this.http.delete(this.baseUrl + 'schtrack-auth/api/v1/SchoolSection/DeleteSection/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
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
