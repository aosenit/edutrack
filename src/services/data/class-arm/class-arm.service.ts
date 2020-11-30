import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addclassarm: 'schtrack-auth/api/v1/ClassArm/AddClassArm',
  getallclassarm: 'schtrack-auth/api/v1/ClassArm/GetAllClassArms',
  getclassarmById: 'schtrack-auth/api/v1/ClassArm/GetAllClassArm',
  updateclassarm: 'schtrack-auth/api/v1/ClassArm/UpdateClassArm',
  deleteclassarm: 'schtrack-auth/api/v1/ClassArm/DeleteClassArm'
};
// const routes = {
//   addclassarm: 'api/v1/ClassArm/AddClassArm',
//   getallclassarm: 'api/v1/ClassArm/GetAllClassArms',
//   getclassarmById: 'schtrack-auth/api/v1/ClassArm/GetAllClassArm',
//   updateclassarm: 'schtrack-auth/api/v1/ClassArm/UpdateClassArm',
//   deleteclassarm: 'schtrack-auth/api/v1/ClassArm/DeleteClassArm'
// };

@Injectable({
  providedIn: 'root'
})
export class ClassArmService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addClassArm( classArmform) {
    const tenantId = '1'; // just a temporary header till email services is ready
    // const body = new FormData();
    // body.append('name', addclassForm.name);
    // body.append('status', addclassForm.status);
    // console.log(body);
    const url = `${this.baseUrl + routes.addclassarm}`;
    return this.http.post(url, classArmform, { headers: { tenantId } });
  }

  getAllClassArm() {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.getallclassarm}`;
    return this.http.get(url, { headers: { tenantId } });
  }

  getClassArmById(id) {
    const tenantId = '1';

    return this.http.get(this.baseUrl + 'schtrack-auth/api/v1/ClassArm/GetClassArmById/' + id, { headers: { tenantId } });
  }

  updateClassArm(id: any, result) {
    const tenantId = '1';
    // const body = new FormData();
    // body.append('Name', name)
    // body.append('Status', status)
    return this.http.put(this.baseUrl + 'schtrack-auth/api/v1/ClassArm/UpdateClassArm/' + id, result, { headers: { tenantId } } );
  }

  deleteClassArm(id: any) {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.deleteclassarm}/${id}`;
    return this.http.delete(url , { headers: { tenantId } });
  }
}
