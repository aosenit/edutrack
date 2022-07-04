import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addschool: 'schtrack-auth/api/v1/School/AddSchool ',
  getschoolbyid: 'schtrack-auth/api/v1/School/GetSchool',
  getallschool: 'schtrack-auth/api/v1/School/GetSchools',
  getSubscriptionStatus: 'schtrack-auth/api/v1/School/NotifySubcriptionExpirationDateToAdmin',
  // getallschool: 'api/v1/School/GetSchools?PageIndex=1&PageSize=10',

  //  grouped schools
  addGroupedSchools: 'schtrack-auth/api/v1/SchoolGroup/AddSchoolGroup ',
  getGroupSchools: 'schtrack-auth/api/v1/SchoolGroup/GetAllSchoolsInGroup',
  getAllGroupSchools: 'schtrack-auth/api/v1/SchoolGroup/GetSchoolGroups',
  getSchoolGroupById: 'schtrack-auth/api/v1/SchoolGroup/GetSchoolGroupsById',
  getSchoolGroupAnalytics: 'schtrack-auth/api/v1/SchoolGroup/GetSchoolGroupAnalytics',


  // others
  bulkUplaod: 'schtrack-auth/api/v1/School/BulkAddSchool',
  updateschoolbyid: 'schtrack-auth/api/v1/School/UpdateSchool',
  deleteschool: 'schtrack-auth/api/v1/School/DeleteSchool',
  viewSchoolproperty: 'schtrack-auth/api/v1/School/GetSchoolNameAndLogo',
  getSchoolDomain: 'schtrack-auth/api/v1/School/GetSchoolNameAndLogoByDomain',

  activateschool: 'schtrack-auth/api/v1/School/EnableSchool',
  deactivateschool: 'schtrack-auth/api/v1/School/DisableSchool'
};

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }


  addSchool(schoolFinalStep) {
    const {GroupId} = schoolFinalStep;
    if (schoolFinalStep.GroupId !== null || undefined) {
      const formData = new FormData();
      formData.append('Name', schoolFinalStep.Name);
      formData.append('DomainName', schoolFinalStep.DomainName);
      formData.append('WebsiteAddress', schoolFinalStep.WebsiteAddress);
      formData.append('Username', schoolFinalStep.Username);
      formData.append('Files', schoolFinalStep.logo);
      formData.append('Files', schoolFinalStep.icon);
      formData.append('PrimaryColor', schoolFinalStep.PrimaryColor);
      formData.append('SecondaryColor', schoolFinalStep.SecondaryColor);
      // formData.append('DocumentTypes', schoolFinalStep.DocumentTypes);
      schoolFinalStep.DocumentTypes.forEach((item) => formData.append('DocumentTypes', item));
      formData.append('Country', schoolFinalStep.Country);
      formData.append('Address', schoolFinalStep.Address);
      formData.append('State', schoolFinalStep.State);
      formData.append('City', schoolFinalStep.City);
      formData.append('ContactFirstName', schoolFinalStep.ContactFirstName);
      formData.append('ContactLastName', schoolFinalStep.ContactLastName);
      formData.append('ContactEmailPassword', schoolFinalStep.ContactEmailPassword);
      formData.append('ContactPhoneNo', schoolFinalStep.ContactPhoneNo);
      formData.append('ContactEmail', schoolFinalStep.ContactEmail);
      formData.append('IsActive', schoolFinalStep.isActive);
      formData.append('GroupId', schoolFinalStep.GroupId);
      const url = `${this.baseUrl + routes.addschool}`;
      // // ('asasas', schoolFinalStep);
      return this.http.post(url, formData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
    } else {
      const formData = new FormData();
      formData.append('Name', schoolFinalStep.Name);
      formData.append('DomainName', schoolFinalStep.DomainName);
      formData.append('WebsiteAddress', schoolFinalStep.WebsiteAddress);
      formData.append('Username', schoolFinalStep.Username);
      formData.append('Files', schoolFinalStep.logo);
      formData.append('Files', schoolFinalStep.icon);
      formData.append('PrimaryColor', schoolFinalStep.PrimaryColor);
      formData.append('SecondaryColor', schoolFinalStep.SecondaryColor);
      // formData.append('DocumentTypes', schoolFinalStep.DocumentTypes);
      schoolFinalStep.DocumentTypes.forEach((item) => formData.append('DocumentTypes', item));
      formData.append('Country', schoolFinalStep.Country);
      formData.append('Address', schoolFinalStep.Address);
      formData.append('State', schoolFinalStep.State);
      formData.append('City', schoolFinalStep.City);
      formData.append('ContactFirstName', schoolFinalStep.ContactFirstName);
      formData.append('ContactLastName', schoolFinalStep.ContactLastName);
      formData.append('ContactEmailPassword', schoolFinalStep.ContactEmailPassword);
      formData.append('ContactPhoneNo', schoolFinalStep.ContactPhoneNo);
      formData.append('ContactEmail', schoolFinalStep.ContactEmail);
      formData.append('IsActive', schoolFinalStep.isActive);
      // formData.append('GroupId', schoolFinalStep.GroupId);
      const url = `${this.baseUrl + routes.addschool}`;
      // // ('asasas', schoolFinalStep);
      return this.http.post(url, formData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );

    }
  }

  getAllSchools( p, perpage ) {
    // const url = `${this.baseUrl + routes.getallschool}`;
    const url = `${this.baseUrl + routes.getallschool}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  getSchoolById(id) {
    const url = `${this.baseUrl + routes.getschoolbyid}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  getSchoolSubscriptionStatusById(id) {
    const url = `${this.baseUrl + routes.getSubscriptionStatus}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  uploadBulkDocument(bulkUpload) {
    const formData = new FormData();
    formData.append('File', bulkUpload.bulkFile);
    const url = `${this.baseUrl + routes.bulkUplaod}`;
    return this.http.post(url, formData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  updateSchool(id, updateSchoolForm) {
    const formData = new FormData();
    formData.append('Name', updateSchoolForm.Name);
    formData.append('DomainName', updateSchoolForm.DomainName);
    formData.append('WebsiteAddress', updateSchoolForm.WebsiteAddress);
    formData.append('Username', updateSchoolForm.Username);
    formData.append('Files', updateSchoolForm.logo);
    formData.append('Files', updateSchoolForm.icon);
    formData.append('PrimaryColor', updateSchoolForm.PrimaryColor);
    formData.append('SecondaryColor', updateSchoolForm.SecondaryColor);
    // formData.append('DocumentTypes', updateSchoolForm.DocumentTypes);
    updateSchoolForm.DocumentTypes.forEach((item) => formData.append('DocumentTypes', item));
    formData.append('Country', updateSchoolForm.Country);
    formData.append('Address', updateSchoolForm.Address);
    formData.append('State', updateSchoolForm.State);
    formData.append('City', updateSchoolForm.City);
    formData.append('ContactFirstName', updateSchoolForm.ContactFirstName);
    formData.append('ContactLastName', updateSchoolForm.ContactLastName);
    formData.append('ContactPhoneNo', updateSchoolForm.ContactPhoneNo);
    formData.append('ContactEmail', updateSchoolForm.ContactEmail);
    const url = `${this.baseUrl + routes.updateschoolbyid}/${id}`;
    return this.http.put(url, formData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  deleteSchoolById(userid) {
    const url = `${this.baseUrl + routes.deleteschool}/${userid}`;
    return this.http.delete(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );

  }

  getSchoolLogo(id) {
    const url = `${this.baseUrl + routes.viewSchoolproperty}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  getSchoolDomainName(domain) {
    const url = `${this.baseUrl + routes.getSchoolDomain}/${domain}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );

  }


  addSchoolGroup(schoolFinalStep) {
    const formData = new FormData();
    formData.append('Name', schoolFinalStep.Name);
    formData.append('WebsiteAddress', schoolFinalStep.WebsiteAddress);
    formData.append('Files', schoolFinalStep.logo);
    formData.append('Files', schoolFinalStep.icon);
    formData.append('PrimaryColor', schoolFinalStep.PrimaryColor);
    formData.append('SecondaryColor', schoolFinalStep.SecondaryColor);
    // formData.append('DocumentTypes', schoolFinalStep.DocumentTypes);
    schoolFinalStep.DocumentTypes.forEach((item) => formData.append('DocumentTypes', item));
    formData.append('ContactFirstName', schoolFinalStep.ContactFirstName);
    formData.append('ContactLastName', schoolFinalStep.ContactLastName);
    formData.append('ContactEmailPassword', schoolFinalStep.ContactEmailPassword);
    formData.append('ContactPhoneNo', schoolFinalStep.ContactPhoneNo);
    formData.append('ContactEmail', schoolFinalStep.ContactEmail);
    formData.append('IsActive', schoolFinalStep.isActive);
    const url = `${this.baseUrl + routes.addGroupedSchools}`;
    return this.http.post(url, formData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  getAllGroupsInASchool( p, perpage, groupId ) {
    const url = `${this.baseUrl + routes.getGroupSchools}?PageIndex=${p}&PageSize=${perpage}&groupId=${groupId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  getSchoolGroupByItsId(id ) {
    const url = `${this.baseUrl + routes.getSchoolGroupById}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  getAllGroupSchools() {
    const url = `${this.baseUrl + routes.getAllGroupSchools}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  getSchoolGroupAnalytics(id) {
    const url = `${this.baseUrl + routes.getSchoolGroupAnalytics}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }

  activateSchool(id) {
    const url = `${this.baseUrl + routes.activateschool}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }
  deactivateSchool(id) {
    const url = `${this.baseUrl + routes.deactivateschool}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } } );
  }
}
