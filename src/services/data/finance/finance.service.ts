import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addBankAccount: 'schtrack-finance/api/v1/BankAccount/NewBankAccount',
  getbankAccount: 'schtrack-finance/api/v1/BankAccount/GetBankAccounts',
  getbankAccountwithId: 'schtrack-finance/api/v1/BankAccount/GetBankAccount',
  udatebankAccountwithId: 'schtrack-finance/api/v1/BankAccount/UpdateBankAccount',
  addAccountclass: 'schtrack-finance/api/v1/AccountClass/NewAccountClass',
  getAccountclass: 'schtrack-finance/api/v1/AccountClass/GetAccountClasses',
  getAccountclassByid: 'schtrack-finance/api/v1/AccountClass/GetAccountClass',
  editAccountclassByid: 'schtrack-finance/api/v1/AccountClass/UpdateAccountClass',
  addAccounttype: 'schtrack-finance/api/v1/AccountType/NewAccountType',
  getAccountTypes: 'schtrack-finance/api/v1/AccountType/GetAccountTypes',
  getAccountTypewithId: 'schtrack-finance/api/v1/AccountType/GetAccountType',
  getAccountTypesbyId: 'schtrack-finance/api/v1/AccountType/GetAccountTypes',
  editAccountTypesbyId: 'schtrack-finance/api/v1/AccountType/UpdateAccountType',
  viewAccounttypesbyClass: 'schtrack-finance/api/v1/AccountType/GetAccountTypes',
  createAccount: 'schtrack-finance/api/v1/Account/NewAccount',
  getChartAccount: 'schtrack-finance/api/v1/Account/GetAccounts',
  getChartAccountWithId: 'schtrack-finance/api/v1/Account/GetAccount',
  editChartAccount: 'schtrack-finance/api/v1/Account/UpdateAccount',
  addfeeGruop: 'schtrack-finance/api/v1/FeeGroup/NewFeeGroup',
  getallfeeGruop: 'schtrack-finance/api/v1/FeeGroup/GetFeeGroups',
  getfeeGruopById: 'schtrack-finance/api/v1/FeeGroup/GetFeeGroup',
  updatefeeGruopById: 'schtrack-finance/api/v1/FeeGroup/UpdateFeeGroup',
  createComponent: 'schtrack-finance/api/v1/Component/NewComponent',
  fetchComponent: 'schtrack-finance/api/v1/Component/GetComponents',
  fetchComponentwithId: 'schtrack-finance/api/v1/Component/GetComponent',
  editComponent: 'schtrack-finance/api/v1/Component/UpdateComponent',
  addNewFee: 'schtrack-finance/api/v1/Fee/NewFee',
  viewAllfee: 'schtrack-finance/api/v1/Fee/GetFees',
  viewfeeById: 'schtrack-finance/api/v1/Fee/GetFee',
  editfeeById: 'schtrack-finance/api/v1/Fee/UpdateFee',
  createInvoice: 'schtrack-finance/api/v1/Invoice/GenerateInvoice',
  getAllInvoices: 'schtrack-finance/api/v1/Invoice/GetAllInvoices',
  getInvoicepaymenthistory: 'schtrack-finance/api/v1/Invoice/GetPaymentHistoryInvoices',
  getpendingInvoicepaymen: 'schtrack-finance/api/v1/Invoice/GetPendingPaymentInvoices',
  getInvocesbyId: 'schtrack-finance/api/v1/Invoice/GetInvoice',
  getpaymentinvoices: 'schtrack-finance/api/v1/Invoice/GetPaymentInvoices',
  getinvoices: 'schtrack-finance/api/v1/Invoice/GetInvoices',
  updateinvoices: 'schtrack-finance/api/v1/Invoice/UpdateInvoiceSelection',
  createTransaction: 'schtrack-finance/api/v1/Transaction/NewTransaction',
  viewAllTransaction: 'schtrack-finance/api/v1/Transaction/GetAllTransactions',
  viewAwaitingApprovalTransaction: 'schtrack-finance/api/v1/Transaction/GetAllAwaitingApprovalTransactions',
  viewPendingTransaction: 'schtrack-finance/api/v1/Transaction/GetAllPendingTransactions',
  viewTransactionHistory: 'schtrack-finance/api/v1/Transaction/GetTransactionHistory',
  editTransactionReciept: 'schtrack-finance/api/v1/Transaction/UploadTransactionReceipt',
  rejectTransaction: 'schtrack-finance/api/v1/Transaction/ApproveRejectTransaction',
  viewtransactionId: 'schtrack-finance/api/v1/Transaction/GetTransaction',
  viewfile: 'schtrack-finance/api/v1/Files/GetFile',

  getAllTransactionByStatus: 'schtrack-finance/api/v1/Transaction/GetAllTransactionsByStatus',
  exportInvoiceInExcel: 'schtrack-finance/api/v1/Transaction/ExportInvoiceReportExcel',
  exportInvoiceInPDF: 'schtrack-finance/api/v1/Transaction/ExportInvoiceReportPDF'


};

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  createNewBankAccount(newAccountData) {
    const url = `${this.baseUrl + routes.addBankAccount}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllBankAccount(p, perpage) {
    const url = `${this.baseUrl + routes.getbankAccount}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getBankAccountById(id) {
    const url = `${this.baseUrl + routes.getbankAccountwithId}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateBankAccountById(id, updateDataForm) {
    const url = `${this.baseUrl + routes.udatebankAccountwithId}/${id}`;
    return this.http.put(url, updateDataForm, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewAccountClass(newAccountData) {
    const url = `${this.baseUrl + routes.addAccountclass}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAccountClass() {
    const url = `${this.baseUrl + routes.getAccountclass}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAccountClassById(id) {
    const url = `${this.baseUrl + routes.getAccountclassByid}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateAccountClassById(updateDataForm) {
    const url = `${this.baseUrl + routes.editAccountclassByid}`;
    return this.http.put(url, updateDataForm, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewAccountType(newAccountData) {
    const url = `${this.baseUrl + routes.addAccounttype}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAccountType() {
    const url = `${this.baseUrl + routes.getAccountTypes}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAccountTypewithId(id) {
    const url = `${this.baseUrl + routes.getAccountTypewithId}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
  getAccountTypeById(id) {
    const url = `${this.baseUrl + routes.getAccountTypesbyId}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateAccountTypeById(id, updateDataForm) {
    const url = `${this.baseUrl + routes.editAccountTypesbyId}/${id}`;
    return this.http.put(url, updateDataForm, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewChartAccount(newAccountData) {
    const url = `${this.baseUrl + routes.createAccount}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllChartOfAccount() {
    const url = `${this.baseUrl + routes.getChartAccount}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getChartAccountByID(id) {
    const url = `${this.baseUrl + routes.getChartAccountWithId}/${id}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  updateChartAccountByID(id, formBody) {
    const url = `${this.baseUrl + routes.editChartAccount}/${id}`;
    return this.http.put(url, formBody, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  createFeeGroup(feegroupdata) {
    const url = `${this.baseUrl + routes.addfeeGruop}`;
    return this.http.post(url, feegroupdata,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllFeeGroup() {
    const url = `${this.baseUrl + routes.getallfeeGruop}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getFeeGroupById(id) {
    const url = `${this.baseUrl + routes.getfeeGruopById}/${id}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  UpdateFeeGroupByID(id, bodyData) {
    const url = `${this.baseUrl + routes.updatefeeGruopById}/${id}`;
    return this.http.put(url, bodyData, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  createNewComponent(componentData) {
    const url = `${this.baseUrl + routes.createComponent}`;
    return this.http.post(url, componentData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getComponent() {
    const url = `${this.baseUrl + routes.fetchComponent}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getComponentById(id) {
    const url = `${this.baseUrl + routes.fetchComponentwithId}/${id}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateComponentById(id, formBody) {
    const url = `${this.baseUrl + routes.editComponent}/${id}`;
    return this.http.put(url, formBody,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createFee(newAccountData) {
    const url = `${this.baseUrl + routes.addNewFee}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllFees() {
    const url = `${this.baseUrl + routes.viewAllfee}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }
  getFeesById(id) {
    const url = `${this.baseUrl + routes.viewfeeById}/${id}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  UpdateFeeById(id, formdata) {
    const url = `${this.baseUrl + routes.editfeeById}/${id}`;
    return this.http.put(url, formdata,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  generteInvoices(newAccountData) {
    const url = `${this.baseUrl + routes.createInvoice}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getInvoicesById(id) {
    const url = `${this.baseUrl + routes.getInvocesbyId}/${id}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllCretedInvoices() {
    const url = `${this.baseUrl + routes.getAllInvoices}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllCretedInvoicesWithPagination(p, perpage) {
    const url = `${this.baseUrl + routes.getAllInvoices}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getInvoicePaymentHistory() {
    const url = `${this.baseUrl + routes.getInvoicepaymenthistory}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getPendingInvoicePayment() {
    const url = `${this.baseUrl + routes.viewPendingTransaction}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getPaymentInvoices() {
    const url = `${this.baseUrl + routes.getpaymentinvoices}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  getInvoices() {
    const url = `${this.baseUrl + routes.getinvoices}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  getAccountTypesByAccountClass(accountClassId) {
    const url = `${this.baseUrl + routes.viewAccounttypesbyClass}/${accountClassId}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewTransaction(transactionData) {
    const url = `${this.baseUrl + routes.createTransaction}`;
    return this.http.post(url, transactionData, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  getAllTransactions() {
    const url = `${this.baseUrl + routes.viewAllTransaction}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllTransactionsAwaitingApproval() {
    const url = `${this.baseUrl + routes.viewAwaitingApprovalTransaction}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllPendingTransactions(StudentId) {
    const url = `${this.baseUrl + routes.viewPendingTransaction}/${StudentId}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllTransactionHistory() {
    const url = `${this.baseUrl + routes.viewTransactionHistory}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getTransactionBYId(id) {
    const url = `${this.baseUrl + routes.viewtransactionId}/${id}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }


  updateSelectedInvoice(formBody) {
    const url = `${this.baseUrl + routes.updateinvoices}`;
    return this.http.put(url, formBody,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }


  updateTransactionReceipt(transactionData) {
    const body = new FormData();
    body.append('TransactionId', transactionData.TransactionId) ;
    body.append('Document', transactionData.Document);
    const url = `${this.baseUrl + routes.editTransactionReciept}`;
    return this.http.put(url, body,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }


  ApproveRejectTransactionReceipt(transactionData) {
    const url = `${this.baseUrl + routes.rejectTransaction}`;
    return this.http.put(url, transactionData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

getFiles(id) {
  const url = `${this.baseUrl + routes.viewfile}/${id}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
}

getAllTransactionByStatus(p, perpage,status,keyword?,filter?, FromDate?, ToDate?){
  const url = `${this.baseUrl + routes.getAllTransactionByStatus}?Keyword=${keyword}&Filter=${filter}&PageIndex=${p}&PageSize=${perpage}&Status=${status}&From=${FromDate}&To=${ToDate}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
}
exportInvoiceInExcel(status, FromDate?, ToDate?){
  const url = `${this.baseUrl + routes.exportInvoiceInExcel}?Status=${status}&From=${FromDate}&To=${ToDate}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

}
exportInvoiceInPDF(status, FromDate?, ToDate?){
  const url = `${this.baseUrl + routes.exportInvoiceInPDF}?Status=${status}&From=${FromDate}&To=${ToDate}`;
  return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

}

 }
