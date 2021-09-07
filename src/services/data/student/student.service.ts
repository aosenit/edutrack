  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { environment } from 'src/environments/environment';
  const routes = {
  addstudent: 'schtrack-auth/api/v1/Student/AddStudent',
  getallstudent: 'schtrack-auth/api/v1/Student/GetAllStudent',
  viewstudentdetails: 'schtrack-auth/api/v1/Student/GetStudentProfile',
  getstudentbyid: 'schtrack-auth/api/v1/Student/GetStudentById',
  updatestudentbyid: 'schtrack-auth/api/v1/Student/UpdateStudent',
  deletestudent: 'schtrack-auth/api/v1/Student/DeleteStudent',
  getBulkDdownload: 'schtrack-auth/api/v1/Student/GetStudentsExcelSheet',
  bulkUpload: 'schtrack-auth/api/v1/Student/AddBulkStudent'
};

  @Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  addStudent(studentForm) {
    // const tenantId = '1'; // just a temporary header till email services is ready
    const { immunizationVms } = studentForm;
    const body = new FormData();
    body.append('FirstName', studentForm.FirstName);
    body.append('LastName', studentForm.LastName);
    body.append('OtherNames', studentForm.OtherNames);
    body.append('MothersMaidenName', studentForm.MothersMaidenName);
    body.append('Sex', studentForm.Sex);
    body.append('DateOfBirth', studentForm.DateOfBirth);
    body.append('Religion', studentForm.Religion);
    body.append('Nationality', studentForm.Nationality);
    body.append('ParentId', studentForm.ParentId);
    body.append('StateOfOrigin', studentForm.StateOfOrigin);
    body.append('LocalGovt', studentForm.LocalGovt);
    body.append('TransportRoute', studentForm.TransportRoute);
    body.append('EntryType', studentForm.EntryType);
    body.append('AdmissionDate', studentForm.AdmissionDate);
    body.append('SectionId', studentForm.SectionId);
    body.append('ClassId', studentForm.ClassId);
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
    return this.http.post(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllStudents(p, perpage) {
    const url = `${this.baseUrl + routes.getallstudent}?PageIndex=${p}&PageSize=${perpage}`;
    // console.log(url);
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getStudentById(id: any) {
    const url = `${this.baseUrl + routes.getstudentbyid}/${id}`;
    // console.log(url);
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  updateStudent(id, updateStudentForm) {
    const { immunizationVms } = updateStudentForm;
    if (updateStudentForm.profilePhoto !== null) {
      // // ('file not empty');
      const body = new FormData();
      body.append('FirstName', updateStudentForm.FirstName);
      body.append('LastName', updateStudentForm.LastName);
      body.append('OtherNames', updateStudentForm.OtherNames);
      body.append('MothersMaidenName', updateStudentForm.MothersMaidenName);
      body.append('Sex', updateStudentForm.Sex);
      body.append('DateOfBirth', updateStudentForm.DateOfBirth);
      body.append('Religion', updateStudentForm.Religion);
      body.append('Nationality', updateStudentForm.Nationality);
      body.append('ParentId', updateStudentForm.ParentId);
      body.append('StateOfOrigin', updateStudentForm.StateOfOrigin);
      body.append('LocalGovt', updateStudentForm.LocalGovt);
      body.append('TransportRoute', updateStudentForm.TransportRoute);
      body.append('EntryType', updateStudentForm.EntryType);
      body.append('AdmissionDate', updateStudentForm.AdmissionDate);
      body.append('SectionId', updateStudentForm.SectionId);
      body.append('ClassId', updateStudentForm.ClassId);
      body.append('StudentType', updateStudentForm.StudentType);
      body.append('ContactPhone', updateStudentForm.ContactPhone);
      body.append('ContactCountry', updateStudentForm.ContactCountry);
      body.append('ContactTown', updateStudentForm.ContactTown);
      body.append('ContactEmail', updateStudentForm.ContactEmail);
      body.append('ContactAddress', updateStudentForm.ContactAddress);
      body.append('ContactState', updateStudentForm.ContactState);
      body.append('BloodGroup', updateStudentForm.BloodGroup);
      body.append('Genotype', updateStudentForm.Genotype);
      body.append('Disability', updateStudentForm.Disability);
      body.append('Allergies', updateStudentForm.Allergies);
      body.append('ConfidentialNotes', updateStudentForm.ConfidentialNotes);
      body.append('Files', updateStudentForm.profilePhoto);
      updateStudentForm.DocumentTypes.forEach((item) => body.append('DocumentTypes', item));
      for (let i = 0; i < immunizationVms.length; i++) {
      body.append('immunizationVms[' + i + '].age', immunizationVms[i].age);
      body.append('immunizationVms[' + i + '].date', immunizationVms[i].date);
      body.append('immunizationVms[' + i + '].vaccine', immunizationVms[i].vaccine);
    }
      const url = `${this.baseUrl + routes.updatestudentbyid}/${id}`;
      return this.http.put(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  } else {
      // console.log('no file selected');
      const body = new FormData();
      body.append('FirstName', updateStudentForm.FirstName);
      body.append('LastName', updateStudentForm.LastName);
      body.append('OtherNames', updateStudentForm.OtherNames);
      body.append('MothersMaidenName', updateStudentForm.MothersMaidenName);
      body.append('Sex', updateStudentForm.Sex);
      body.append('DateOfBirth', updateStudentForm.DateOfBirth);
      body.append('Religion', updateStudentForm.Religion);
      body.append('Nationality', updateStudentForm.Nationality);
      body.append('ParentId', updateStudentForm.ParentId);
      body.append('StateOfOrigin', updateStudentForm.StateOfOrigin);
      body.append('LocalGovt', updateStudentForm.LocalGovt);
      body.append('TransportRoute', updateStudentForm.TransportRoute);
      body.append('EntryType', updateStudentForm.EntryType);
      body.append('AdmissionDate', updateStudentForm.AdmissionDate);
      body.append('SectionId', updateStudentForm.SectionId);
      body.append('ClassId', updateStudentForm.ClassId);
      body.append('StudentType', updateStudentForm.StudentType);
      body.append('ContactPhone', updateStudentForm.ContactPhone);
      body.append('ContactCountry', updateStudentForm.ContactCountry);
      body.append('ContactTown', updateStudentForm.ContactTown);
      body.append('ContactEmail', updateStudentForm.ContactEmail);
      body.append('ContactAddress', updateStudentForm.ContactAddress);
      body.append('ContactState', updateStudentForm.ContactState);
      body.append('BloodGroup', updateStudentForm.BloodGroup);
      body.append('Genotype', updateStudentForm.Genotype);
      body.append('Disability', updateStudentForm.Disability);
      body.append('Allergies', updateStudentForm.Allergies);
      body.append('ConfidentialNotes', updateStudentForm.ConfidentialNotes);
      for (let i = 0; i < immunizationVms.length; i++) {
      body.append('immunizationVms[' + i + '].age', immunizationVms[i].age);
      body.append('immunizationVms[' + i + '].date', immunizationVms[i].date);
      body.append('immunizationVms[' + i + '].vaccine', immunizationVms[i].vaccine);
    }
      const url = `${this.baseUrl + routes.updatestudentbyid}/${id}`;
      return this.http.put(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
    }


  }

    deleteStudentById(id) {
    const url = `${this.baseUrl + routes.deletestudent}/${id}`;
    return this.http.delete(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

    getStudentProfile(id) {
    const url = `${this.baseUrl + routes.viewstudentdetails}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }


    downloadSampleBulkSheet() {
      const url = `${this.baseUrl + routes.getBulkDdownload}`;
      return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  
    }

    uploadBulkDocument(payload) {
      const body = new FormData();
      body.append('Files', payload.Document);

      const url = `${this.baseUrl + routes.bulkUpload}`;
      return this.http.post(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

    }
}
