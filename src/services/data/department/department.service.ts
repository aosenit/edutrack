import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// const routes = {
//   adddepartment: 'schtrack-auth/api/v1/Department/AddDepartment',
//   getalldepartments: 'schtrack-auth/api/v1/Department/GetAllDepartments',
// };
const routes = {
  adddepartment: 'api/v1/Department/AddDepartment',
  getalldepartments: 'api/v1/Department/GetAllDepartments',
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addDepartment( departmentForm) {
    const tenantId = '1'; // just a temporary header till email services is ready
    const body = new FormData();
    body.append('name', departmentForm.name);
    body.append('isActive', departmentForm.isActive);
    console.log(body);
    const url = `${this.baseUrl2 + routes.adddepartment}`;
    return this.http.post(url, body, { headers: { tenantId } });
  }

  getAllDepartment() {
    const tenantId = '1';

    const url = `${this.baseUrl2 + routes.getalldepartments}`;
    return this.http.get(url, { headers: { tenantId } });
  }
}
