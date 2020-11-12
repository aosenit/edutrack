import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const tenantId = '1'
const routes = {
  addstudent: 'schtrack-auth/api/v1/Student/AddStudent',
  getallstudent: 'schtrack-auth/api/v1/Student/GetAllStudent',
  getstudentbyid: 'Student/GetStudentById',
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
    const tenantId = '1';

    const body = new FormData();
    body.append('ContactFirstName', studentForm.ContactFirstName);
    body.append('ContactLastName', studentForm.ContactLastName);
    body.append('ContactOtherName', studentForm.ContactOtherName);
    body.append('address', studentForm.address);
    body.append('admissionDate', studentForm.admissionDate);
    body.append('age', studentForm.age);
    body.append('allergies', studentForm.allergies);
    body.append('bloodGroup', studentForm.bloodGroup);
    body.append('city', studentForm.city);
    body.append('contactEmail', studentForm.contactEmail);
    body.append('contactPhoneNumber', studentForm.contactPhoneNumber);
    body.append('country', studentForm.country);
    body.append('date', studentForm.date);
    body.append('disability', studentForm.disability);
    body.append('dob', studentForm.dob);
    body.append('entryType', studentForm.entryType);
    body.append('genotype', studentForm.genotype);
    body.append('immunization', studentForm.immunization);
    body.append('level', studentForm.level);
    body.append('lga', studentForm.lga);
    body.append('motherName', studentForm.motherName);
    body.append('nationality', studentForm.nationality);
    body.append('note', studentForm.note);
    body.append('parents', studentForm.parents);
    body.append('profilePhoto', studentForm.profilePhoto);
    studentForm.DocumentTypes.forEach((item) => body.append('DocumentTypes', item));
    body.append('religion', studentForm.religion);
    body.append('sex', studentForm.sex);
    body.append('state', studentForm.state);
    body.append('studentClass', studentForm.studentClass);
    body.append('studentType', studentForm.studentType);
    body.append('transportRoute', studentForm.transportRoute);
    body.append('vaccine', studentForm.vaccine);
    const url = `${this.baseUrl + routes.addstudent}`;
    return this.http.post(url, body, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
  }

  getAllStudents() {
    
    const url = `${this.baseUrl + routes.getallstudent}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
  }

  getStudentById(id) {
    const url = `${this.baseUrl + routes.getstudentbyid}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

  }

  updateStudent(id, updateStudentForm) {
    const url = `${this.baseUrl + routes.updatestudentbyid}/${id}`;
    return this.http.put(url, updateStudentForm, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

  }

  deleteStudentById(id) {
    const url = `${this.baseUrl + routes.deletestudent}/${id}`;
    return this.http.delete(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

  }
}
