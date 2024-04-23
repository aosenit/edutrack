import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  adddepartment: 'schtrack-auth/api/v1/Department/AddDepartment',
  getalldepartments: 'schtrack-auth/api/v1/Department/GetAllDepartments',
  deletedepartment: 'schtrack-auth/api/v1/Department/DeleteDepartment',
};
// const routes = {
//   adddepartment: 'api/v1/Department/AddDepartment',
//   getalldepartments: 'api/v1/Department/GetAllDepartments',
// };

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addDepartment( departmentForm) {
    // const tenantId = '1'; // just a temporary header till email services is ready
    // const body = new FormData();
    // body.append('name', departmentForm.name);
    // body.append('isActive', departmentForm.isActive);
    // // (body);
    const url = `${this.baseUrl + routes.adddepartment}`;
    return this.http.post(url, departmentForm,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllDepartment() {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.getalldepartments}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  deleteDepartment(id: any) {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.deletedepartment}/${id}`;
    return this.http.delete(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
}
