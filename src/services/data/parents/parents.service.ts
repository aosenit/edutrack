import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const routes = {
  addparent: 'schtrack-auth/api/v1/Parent/AddNewParent  ',
  getallparent: 'schtrack-auth/api/v1/Parent/GetAllParents',
  getallparentinASchool: 'schtrack-auth/api/v1/Parent/GetAllParentsInSchool',
  getparentbyid: 'schtrack-auth/api/v1/Parent/GetParentById',
  getparentbyname: 'schtrack-auth/api/v1/Parent/GetParentByFirstName',
  getstudentparent: 'schtrack-auth/api/v1/Parent/GetParentsForStudent',
  updateparentbyid: 'schtrack-auth/api/v1/Parent/UpdateParent',
  deleteparent: 'schtrack-auth/api/v1/Parent/DeleteParent',
  getstudentSchools: 'schtrack-auth/api/v1/Parent/GetStudentsSchools',
  getstudentInASchoolsForParent: 'schtrack-auth/api/v1/Parent/GetStudentsInSchool',
  searchParent: 'schtrack-auth/api/v1/Parent/GetParentBySchoolIdAndName',

  exportSingleStudentAttendanceForClassPdf:'schtrack-learning/api/v1/Attendance/ExportSingleStudentAttendanceForClassPDF',
  exportSingleStudentAttendanceForSubjectPdf:'schtrack-learning/api/v1/Attendance/ExportSingleStudentAttendanceForSubjectPDF',
  exportSingleStudentAttendanceForClassExcel:'schtrack-learning/api/v1/Attendance/ExportSingleStudentAttendanceForClassExcel',
  exportSingleStudentAttendanceForSubjectExcel:'schtrack-learning/api/v1/Attendance/ExportSingleStudentAttendanceForSubjectExcel',
  getallSubjects: 'schtrack-learning/api/v1/Subject/GetAllSubjects',
  getBulkDdownload: 'schtrack-auth/api/v1/Parent/GetParentsExcelSheet',
  bulkUpload: 'schtrack-auth/api/v1/Parent/AddBulkParent',

  // All endpoint below are exclusively for the parent portal
  getTableforClassByClassId: 'schtrack-learning/api/v1/TimeTable/GetTimetableForClass',
  getTableforClassByDay: 'schtrack-learning/api/v1/TimeTable/GetAllClassesForClassToday',
  getPeriods : 'schtrack-learning/api/v1/TimeTable/GetPeriods',
  // tslint:disable-next-line:max-line-length
  getallsubjectsWithAssignmentforclass: 'schtrack-learning/api/v1/ClassSubject/GetSubjectsForClassWithAssignmentCount', // this endpoint get all subjects and assignment counts in each subject
  getAssignmentByClassSubject: 'schtrack-learning/api/v1/Assignment/GetAssignmentsByClassSubject',
  getchildsubmissions: 'schtrack-learning/api/v1/AssignmentAnswer/GetAssignmentSubmissionForStudent',
  getsubjectAttendance: 'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForSubject',
  getclassAttendance: 'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForClass',
  getapprovedResult: 'schtrack-assessment/api/v1/Result/GetApprovedStudentReportSheet',
  viewstudentbehaviour: 'schtrack-assessment/api/v1/Result/GetBehaviourResult',
  getClassAndSubjectForATeahcer: 'schtrack-learning/api/v1/TeacherClassSubject/GetAllClassSubjectsForTeacher',
  getschoolSessions: 'schtrack-assessment/api/v1/SessionSetup/GetSchoolSessions',

  getinvoices: 'schtrack-finance/api/v1/Invoice/GetInvoices',
  updateinvoices: 'schtrack-finance/api/v1/Invoice/UpdateInvoiceSelection',
  getInvoicepaymenthistory: 'schtrack-finance/api/v1/Invoice/GetPaymentHistoryInvoices',

  createTransaction: 'schtrack-finance/api/v1/Transaction/NewTransaction',
  editTransactionReciept: 'schtrack-finance/api/v1/Transaction/UploadTransactionReceipt',
  getInvocesbyId: 'schtrack-finance/api/v1/Invoice/GetInvoice',

  viewTransactionHistory: 'schtrack-finance/api/v1/Transaction/GetTransactionHistory',
  viewAllTransaction: 'schtrack-finance/api/v1/Transaction/GetAllTransactions',
  viewPendingTransaction: 'schtrack-finance/api/v1/Transaction/GetAllPendingTransactions',


  viewfile: 'schtrack-finance/api/v1/Files/GetFile',

  getAllGradeSetup: 'schtrack-assessment/api/v1/GradeSetup/GetAllGradeForSchoolSetup',
  viewSchoolproperty: 'schtrack-auth/api/v1/School/GetSchoolNameAndLogo',
  getschoolbyid: 'schtrack-auth/api/v1/School/GetSchool',

  getassessmentsetup: 'schtrack-assessment/api/v1/AssessmentSetup/GetAllAssessmentSetup',

  staffSignature: 'schtrack-auth/api/v1/Staff/GetStaffNameAndSignatureByUserId',
  getStudentSubjectAttendance:'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForSubject',


};

const tenantId = sessionStorage.getItem('tenant');
@Injectable({
  providedIn: 'root'
})
export class ParentsService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addParent(createParentForm) {

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
    return this.http.post(url, formData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllParents(p, perpage) {

    const url = `${this.baseUrl + routes.getallparent}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllParentsInASchool(schoolId, p, perpage) {
    const url = `${this.baseUrl + routes.getallparentinASchool}/${schoolId}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
  getAllParentsWithName() {

    const url = `${this.baseUrl + routes.getallparent}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getParentById(id) {

    const url = `${this.baseUrl + routes.getparentbyid}/${id}`;
    return this.http.get(url,   {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getParentByFirstName(name) {

    const url = `${this.baseUrl + routes.getparentbyname}/${name}`;
    return this.http.get(url,   {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  searchSingleParent(name: string, schoolId: string) {
    const url = `${this.baseUrl + routes.searchParent}?Name=${name}&SchoolId=${schoolId}`;
    // console.log(url);
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getParentForStudent(studid) {
    const url = `${this.baseUrl + routes.getstudentparent}/${studid}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateParent(id, updateParentForm) {
    const formData = new FormData();
    formData.append('HomeAddress', updateParentForm.HomeAddress);
    formData.append('SecondaryPhoneNumber', updateParentForm.SecondaryPhoneNumber);
    formData.append('SecondaryEmailAddress', updateParentForm.SecondaryEmailAddress);
    formData.append('EmailAddress', updateParentForm.EmailAddress);
    formData.append('FirstName', updateParentForm.FirstName);
    formData.append('LastName', updateParentForm.LastName);
    formData.append('OtherName', updateParentForm.OtherName);
    formData.append('ModeOfIdentification', updateParentForm.ModeOfIdentification);
    formData.append('IdentificationNumber', updateParentForm.IdentificationNumber);
    formData.append('PhoneNumber', updateParentForm.PhoneNumber);
    formData.append('Occupation', updateParentForm.Occupation);
    formData.append('OfficeAddress', updateParentForm.OfficeAddress);
    formData.append('File', updateParentForm.profileImage);
    updateParentForm.DocumentTypes.forEach((item) => formData.append('DocumentType', item));
    formData.append('Sex', updateParentForm.Sex);
    formData.append('Status', updateParentForm.Status);
    formData.append('Title', updateParentForm.Title);
    const url = `${this.baseUrl + routes.updateparentbyid}/${id}`;
    return this.http.put(url, formData, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  deleteParentById(id) {
    const url = `${this.baseUrl + routes.deleteparent}/${id}`;
    return this.http.delete(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  downloadSampleBulkSheet() {
    const url = `${this.baseUrl + routes.getBulkDdownload}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  uploadBulkDocument(payload) {
    const body = new FormData();
    body.append('File', payload.Document);

    const url = `${this.baseUrl + routes.bulkUpload}`;
    return this.http.post(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  // Endpoints designnated for parent portal

  getStudentSchools() {
    const url = `${this.baseUrl + routes.getstudentSchools}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  getChildInASchoolForParent() {
    // const id = sessionStorage.getItem('tenant');
    // const tenantId = id;
    const url = `${this.baseUrl + routes.getstudentInASchoolsForParent}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

  }


  getPeriods() {
    // const id = sessionStorage.getItem('tenant');
    // const tenantId = id;

    const url = `${this.baseUrl + routes.getPeriods}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }



  getTimeTableForClass(classId) {
    // const id = sessionStorage.getItem('tenant');
    // const tenantId = id;
    const url = `${this.baseUrl + routes.getTableforClassByClassId}?classId=${classId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }



  getAllClassesForClassByDay( classId, day) {
    // const id = sessionStorage.getItem('tenant');
    // const tenantId = id;

    const url = `${this.baseUrl + routes.getTableforClassByDay}?classId=${classId}&day=${day}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getAllSubjectsInAClassByClassID(id) {
    const url = `${this.baseUrl + routes.getallsubjectsWithAssignmentforclass}?classid=${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId  } });
  }

  getAllSubjects() {
    const url = `${this.baseUrl + routes.getallSubjects}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'),tenantId  } });

  }

  getAllSubjectsInAClassWithAssignmentCountByClassID(classId) {
    // const id = sessionStorage.getItem('tenant');
    // const tenantId = id;
    const url = `${this.baseUrl + routes.getallsubjectsWithAssignmentforclass}?classId=${classId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getAssignmentsByClassSubject(classSubjectId: number) {
    // const id = sessionStorage.getItem('tenant');
    // const tenantId = id;
    const url = `${this.baseUrl + routes.getAssignmentByClassSubject}?classSubjectId=${classSubjectId}`;
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }


  getStudentAssignmentSubmission(childId) {
    const url = `${this.baseUrl + routes.getchildsubmissions}?studentId=${childId}`;

    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
  }

  getSubjectAttendance(StudentId) {
    const url = `${this.baseUrl + routes.getsubjectAttendance}?StudentId=${StudentId}`;
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }
  getStudentAttendanceForSubject(studentId?,studentUserId?,subjectId?, date?) {
    const url = `${this.baseUrl + routes.getStudentSubjectAttendance}?studentId=${studentId}&studentUserId=${studentUserId}&subjectId=${subjectId}&date=${date}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'),tenantId  } });
  }
  getClassAttendance(StudentId, ClassId, FromDate, ToDate) {
    const url = `${this.baseUrl + routes.getclassAttendance}?StudentId=${StudentId}&ClassId=${ClassId}&FromDate=${FromDate}&ToDate=${ToDate}`;
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getStudentBehviour(SessionId, TermSequence, ClassId, StudentId) {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl + routes.viewstudentbehaviour}?SessionId=${SessionId}&TermSequence=${TermSequence}&ClassId=${ClassId}&StudentId=${StudentId}`;
    return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
   }


 getApprovedStudentResult(studId, classId, sessionId, termSequenceNumber) {
  // tslint:disable-next-line:max-line-length
  const url = `${this.baseUrl + routes.getapprovedResult}?studId=${studId}&classId=${classId}&sessionId=${sessionId}&termSequenceNumber=${termSequenceNumber}`;
  return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

 }

 getSchoolSessions() {
  const url = `${this.baseUrl + routes.getschoolSessions}`;
  return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId  }});
}

getInvoices(ClassId, StudentId) {
  const url = `${this.baseUrl + routes.getinvoices}?ClassId=${ClassId}&StudentId=${StudentId}`;
  return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') , tenantId  }});

}

getTransactionPaymentHistory(StudentId) {
  const url = `${this.baseUrl + routes.viewTransactionHistory}/${StudentId}`;
  return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
}

createNewTransaction(transactionData) {
  const url = `${this.baseUrl + routes.createTransaction}`;
  return this.http.post(url, transactionData, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

}

getAllTransactions() {
  const url = `${this.baseUrl + routes.viewAllTransaction}`;
  return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
}


getInvoicesById(id) {
  const url = `${this.baseUrl + routes.getInvocesbyId}/${id}`;
  return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId  }});
}

getAllPendingTransactions(StudentId) {
  const url = `${this.baseUrl + routes.viewPendingTransaction}?studentId=${StudentId}`;
  return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
}

updateTransactionReceipt(transactionData) {
  const body = new FormData();
  body.append('TransactionId', transactionData.TransactionId) ;
  body.append('PaymentReference', transactionData.PaymentReference) ;
  body.append('PaymentDescription', transactionData.PaymentDescription) ;
  body.append('Document', transactionData.Document);
  const url = `${this.baseUrl + routes.editTransactionReciept}`;
  return this.http.put(url, body,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
}

updateSelectedInvoice(formBody) {
  const url = `${this.baseUrl + routes.updateinvoices}`;
  return this.http.put(url, formBody,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
}

getFiles(id) {
  const url = `${this.baseUrl + routes.viewfile}/${id}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });

}


getAllGradeSetupForSchool() {

  const url = `${this.baseUrl + routes.getAllGradeSetup}`;
  return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

}

getSchoolLogo() {
  const url = `${this.baseUrl + routes.viewSchoolproperty}/${tenantId}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } } );
}


getSchoolById(id) {
  const url = `${this.baseUrl + routes.getschoolbyid}/${id}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } } );
}

getAllAssessmentSetup() {
  const url = `${this.baseUrl + routes.getassessmentsetup}`;
  return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId  }});
}

getStaffSignature(userId) {
  const url = `${this.baseUrl + routes.staffSignature}/${userId}`;

  return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId  }});

}

exportSingleStudentAttendanceByClassExcel(StudentId?,StudentUserId?, ClassId?, FromDate?, ToDate?) {
  const url =`${this.baseUrl + routes.exportSingleStudentAttendanceForClassExcel}?StudentId=${StudentId}&StudentUserId=${StudentUserId}&ClassId=${ClassId}&FromDate=${FromDate}&ToDate=${ToDate}`;
  return this.http.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'),tenantId  } });
}
exportSingleStudentAttendanceByClassPdf(StudentId?,StudentUserId?, ClassId?, FromDate?, ToDate?) {
  const url =`${this.baseUrl + routes.exportSingleStudentAttendanceForClassPdf}?StudentId=${StudentId}&StudentUserId=${StudentUserId}&ClassId=${ClassId}&FromDate=${FromDate}&ToDate=${ToDate}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'),tenantId  } });
}
exportSingleStudentAttendanceBySubjectExcel(studentId?,studentUserId?,subjectId?, date?) {
  const url =`${this.baseUrl + routes.exportSingleStudentAttendanceForSubjectExcel}?studentId=${studentId}&studentUserId=${studentUserId}&subjectId=${subjectId}&date=${date}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'),tenantId  } });
}
exportSingleStudentAttendanceBySubjectPdf(studentId?, studentUserId?, subjectId?, date?) {
  const url = `${this.baseUrl + routes.exportSingleStudentAttendanceForSubjectPdf}?studentId=${studentId}&studentUserId=${studentUserId}&subjectId=${subjectId}&date=${date}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId  } });
}


}
