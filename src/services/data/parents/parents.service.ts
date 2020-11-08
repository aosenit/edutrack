import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addparent: 'schtrack-auth/api/v1/Parent/AddNewParent  ',
  getallparent: 'schtrack-auth/api/v1/Parent/GetAllParents',
  getparentbyid: 'schtrack-auth/api/v1/Parent/GetParentById',
  getstudentparent: 'schtrack-auth/api/v1/Parent/GetParentsForStudent',
  updateparentbyid: 'schtrack-auth/api/v1/Parent/UpdateParent ',
  deleteparent: 'schtrack-auth/api/v1/Parent/DeleteParent'
};

@Injectable({
  providedIn: 'root'
})
export class ParentsService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addParent(createParentForm) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const formData = new FormData();
    formData.append('address', createParentForm.address);
    formData.append('altPhone', createParentForm.altPhone);
    formData.append('contactAltEmail', createParentForm.contactAltEmail);
    formData.append('contactEmail', createParentForm.contactEmail);
    formData.append('contactFirstName', createParentForm.contactFirstName);
    formData.append('contactLastName', createParentForm.contactLastName);
    formData.append('contactOtherName', createParentForm.contactOtherName);
    formData.append('identification', createParentForm.identification);
    formData.append('identificationNumber', createParentForm.identificationNumber);
    formData.append('myPhone', createParentForm.myPhone);
    formData.append('occupation', createParentForm.occupation);
    formData.append('officeAddress', createParentForm.officeAddress);
    formData.append('Files', createParentForm.profileImage);
    createParentForm.DocumentTypes.forEach((item) => formData.append('DocumentTypes', item));
    formData.append('sex', createParentForm.sex);
    formData.append('status', createParentForm.status);
    formData.append('title', createParentForm.title);
    const url = `${this.baseUrl + routes.addparent}`;
    return this.http.post(url, formData, { headers: { tenantId } });
  }

  getAllParents() {
    const url = `${this.baseUrl + routes.getallparent}`;
    return this.http.get(url);
  }

  getParentById(id) {
    const url = `${this.baseUrl + routes.getparentbyid}/${id}`;
    return this.http.get(url, id);
  }

  getParentForStudent(studid) {
    const url = `${this.baseUrl + routes.getstudentparent}/${studid}`;
    return this.http.get(url, studid);
  }
  updateParent(id, updateParentForm) {
    const url = `${this.baseUrl + routes.updateparentbyid}/${id}`;
    return this.http.put(url, updateParentForm);

  }

  deleteParentById(id) {
    const url = `${this.baseUrl + routes.deleteparent}/${id}`;
    return this.http.delete(url);

  }
}
