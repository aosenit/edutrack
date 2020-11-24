import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addstudent: 'schtrack-auth/api/v1/Student/AddStudent',
  getallstudent: 'schtrack-auth/api/v1/Student/GetAllStudent',
  getstudentbyid: 'schtrack-auth/api/v1/Student/GetStudentById',
  updatestudentbyid: 'Student/UpdateStudent',
  deletestudent: 'Student/DeleteStudent'
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addStudent(studentForm) {
    const tenantId = '1'; // just a temporary header till email services is ready
    const {immunizationVms} = studentForm;
    const body = new FormData();
    body.append('FirstName', studentForm.FirstName);
    body.append('LastName', studentForm.LastName);
    body.append('OtherNames', studentForm.OtherNames);
    body.append('MothersMaidenName', studentForm.MothersMaidenName);
    body.append('Sex', studentForm.Sex);
    body.append('DateOfBirth', studentForm.DateOfBirth);
    body.append('Religion', studentForm.Religion);
    body.append('Nationality', studentForm.Nationality);
    body.append('ParentId', studentForm.ParentId );
    body.append('StateOfOrigin', studentForm.StateOfOrigin);
    body.append('LocalGovt', studentForm.LocalGovt);
    body.append('TransportRoute', studentForm.TransportRoute);
    body.append('EntryType', studentForm.EntryType);
    body.append('AdmissionDate', studentForm.AdmissionDate);
    body.append('SectionId', studentForm.SectionId );
    body.append('ClassId', studentForm.ClassId  );
    body.append('StudentType', studentForm.StudentType);
    body.append('ContactPhone', studentForm.ContactPhone);
    body.append('ContactCountry', studentForm.ContactCountry);
    body.append('ContactTown', studentForm.ContactTown);
    body.append('ContactEmail', studentForm.ContactEmail);
    body.append('ContactAddress', studentForm.ContactAddress);
    body.append('ContactState', studentForm.ContactState);
    body.append('BloodGroup', studentForm.BloodGroup);
    body.append('Genotype', studentForm.Genotype);
    body.append('Disability', studentForm.Disability);
    body.append('Allergies', studentForm.Allergies);
    body.append('ConfidentialNotes', studentForm.ConfidentialNotes);
    body.append('Files', studentForm.profilePhoto);
    studentForm.DocumentTypes.forEach((item) => body.append('DocumentTypes', item));
    for (let i = 0; i < immunizationVms.length; i++) {
      body.append('immunizationVms[' + i + '].age', immunizationVms[i].age);
      body.append('immunizationVms[' + i + '].date', immunizationVms[i].date);
      body.append('immunizationVms[' + i + '].vaccine', immunizationVms[i].vaccine);
    }
    const url = `${this.baseUrl + routes.addstudent}`;
    return this.http.post(url, body, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
  }

  getAllStudents() {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getallstudent}`;
    console.log(url);
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
  }

  getStudentById(id: any) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getstudentbyid}/${id}`;
    console.log(url);
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

  }

  updateStudent(id, updateStudentForm) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.updatestudentbyid}/${id}`;
    return this.http.put(url, updateStudentForm, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

  }

  deleteStudentById(id) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.deletestudent}/${id}`;
    return this.http.delete(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

  }
}
