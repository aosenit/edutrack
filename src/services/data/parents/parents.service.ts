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
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  addParent(createParentForm) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const formData = new FormData();
    formData.append('HomeAddress', createParentForm.HomeAddress);
    formData.append('SecondaryPhoneNumber', createParentForm.SecondaryPhoneNumber);
    formData.append('SecondaryEmailAddress', createParentForm.SecondaryEmailAddress);
    formData.append('EmailAddress', createParentForm.EmailAddress);
    formData.append('FirstName', createParentForm.FirstName);
    formData.append('LastName', createParentForm.LastName);
    formData.append('OtherName', createParentForm.OtherName);
    formData.append('ModeOfIdentification', createParentForm.ModeOfIdentification);
    formData.append('IdentificationNumber', createParentForm.IdentificationNumber);
    formData.append('PhoneNumber', createParentForm.PhoneNumber);
    formData.append('Occupation', createParentForm.Occupation);
    formData.append('OfficeAddress', createParentForm.OfficeAddress);
    formData.append('File', createParentForm.profileImage);
    createParentForm.DocumentTypes.forEach((item) => formData.append('DocumentType', item));
    formData.append('Sex', createParentForm.Sex);
    formData.append('Status', createParentForm.Status);
    formData.append('Title', createParentForm.Title);
    const url = `${this.baseUrl + routes.addparent}`;
    return this.http.post(url, formData, { headers: { tenantId } });
  }

  getAllParents() {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getallparent}`;
    return this.http.get(url, { headers: { tenantId } });
  }

  getParentById(id) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getparentbyid}/${id}`;
    return this.http.get(url,  { headers: { tenantId } });
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
