import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addteacher: 'schtrack-auth/api/v1/Teacher/AddTeacher ',
  getallteacher: 'schtrack-auth/api/v1/Teacher/GetTeachers',
  getteacherbyid: 'schtrack-auth/api/v1/Teacher/GetTeachers',
  updateteacherbyid: 'schtrack-auth/api/v1/Teacher/UpdateTeacher',
  deleteteacher: 'schtrack-auth/api/v1/Teacher/DeleteTeacher',

  attachteachertosubject: 'schtrack-learning/api/v1/TeacherClassSubject/AddClassSubjectsToTeacher',
  getteacherdesignation: 'schtrack-learning/api/v1/TeacherClassSubject/GetAllClassSubjectsForTeacher'
};
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  addTeacher(form) {

    const tenantId = '1'; // just a temporary header till email services is ready
    const { EducationExperienceVMs, WorkExperienceVMs } = form;
    const body = new FormData();
    body.append('FirstName', form.FirstName);
    body.append('LastName', form.LastName);
    body.append('OtherNames', form.OtherNames);
    body.append('DateOfBirth', form.DateOfBirth);
    body.append('Sex', form.Sex);
    body.append('MaritalStatus', form.MaritalStatus);
    body.append('BloodGroup', form.BloodGroup);
    body.append('Nationality', form.Nationality);
    body.append('StateOfOrigin', form.StateOfOrigin);
    body.append('LocalGovernment', form.LocalGovernment);
    body.append('Religion', form.Religion);
    body.append('IsActive', form.IsActive);
    form.DocumentTypes.forEach((item) => body.append('DocumentTypes', item));
    body.append('EmploymentDetails.StaffType', form.StaffType);
    body.append('EmploymentDetails.EmployementStatus', form.EmployementStatus);
    body.append('EmploymentDetails.HighestQualification', form.HighestQualification);
    body.append('EmploymentDetails.JobTitle', form.JobTitle);
    body.append('EmploymentDetails.DepartmentId', form.DepartmentId);
    body.append('EmploymentDetails.PayGrade', form.PayGrade);
    body.append('EmploymentDetails.EmploymentDate', form.EmploymentDate);
    body.append('EmploymentDetails.ResumptionDate', form.ResumptionDate);
    body.append('ContactDetails.PhoneNumber', form.PhoneNumber);
    body.append('ContactDetails.contactAltEmail', form.AltEmailAddress);
    body.append('ContactDetails.AltEmailAddress', form.AltEmailAddress);
    body.append('ContactDetails.AltPhoneNumber', form.AltPhoneNumber);
    body.append('ContactDetails.EmailAddress', form.EmailAddress);
    body.append('ContactDetails.Country', form.Country);
    body.append('ContactDetails.Address', form.Address);
    body.append('ContactDetails.State', form.State);
    body.append('ContactDetails.Town', form.Town);
    body.append('NextOfKin.NextKinAddress', form.NextKinAddress);
    body.append('NextOfKin.NextKinCity', form.NextKinCity);
    body.append('NextOfKin.NextKinCountry', form.NextKinCountry);
    body.append('NextOfKin.NextKinFirstName', form.NextKinLastName);
    body.append('NextOfKin.NextKinLastName', form.NextKinLastName);
    body.append('NextOfKin.NextKinOccupation', form.NextKinOccupation);
    body.append('NextOfKin.NextKinOtherName', form.NextKinOtherName);
    body.append('NextOfKin.NextKinPhone', form.NextKinPhone);
    body.append('NextOfKin.NextKinRelationship', form.NextKinRelationship);
    body.append('NextOfKin.NextKinState', form.NextKinState);
    body.append('Files', form.signature);
    body.append('Files', form.profile);
    for (let i = 0; i < WorkExperienceVMs.length; i++) {
      body.append('WorkExperienceVMs[' + i + '].workRole', WorkExperienceVMs[i].workRole);
      body.append('WorkExperienceVMs[' + i + '].workCompanyName', WorkExperienceVMs[i].workCompanyName);
      body.append('WorkExperienceVMs[' + i + '].startTime', WorkExperienceVMs[i].startTime);
      body.append('WorkExperienceVMs[' + i + '].endTime', WorkExperienceVMs[i].endTime);
    }
    for (let i = 0; i < EducationExperienceVMs.length; i++) {
      body.append('EducationExperienceVMs[' + i + '].educationSchoolName', EducationExperienceVMs[i].educationSchoolName);
      // tslint:disable-next-line:max-line-length
      body.append('EducationExperienceVMs[' + i + '].educationSchoolQualification', EducationExperienceVMs[i].educationSchoolQualification);
      body.append('EducationExperienceVMs[' + i + '].startDate', EducationExperienceVMs[i].startDate);
      body.append('EducationExperienceVMs[' + i + '].endDate', EducationExperienceVMs[i].endDate);
    }
    const url = `${this.baseUrl + routes.addteacher}`;
    console.log(url);
    return this.http.post(url, body, { headers: { tenantId } });
  }

  getAllTeachers() {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getallteacher}`;
    return this.http.get(url, { headers: { tenantId } });
  }

  getTeacherById(id: any) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getteacherbyid}/${id}`;
    return this.http.get(url, { headers: { tenantId } });
  }

  updateTeacher(userid, updateTeacherForm) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.updateteacherbyid}/${userid}`;
    return this.http.put(url, updateTeacherForm, { headers: { tenantId } });

  }

  deleteTeacherById(userid) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + '/givenApi'}/${userid}`;
    return this.http.delete(url, { headers: { tenantId } });

  }

  // learning service for teacher realted stuff goes down here

  attachTeacherToSubject(result) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const body = new FormData();
    body.append('TeacherId', result.TeacherId);
    body.append('ClassSubjectIds', result.ClassSubjectIds);
    const url = `${this.baseUrl + routes.attachteachertosubject}`;

    return this.http.post(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });

  }

  getAttachedSubjects(id: any) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getteacherdesignation}/${id}`;

    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });

  }
}
