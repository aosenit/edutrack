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
  addfeeGruop: 'schtrack-finance/api/v1/FeeGroup/NewFeeGroup',
  getallfeeGruop: 'schtrack-finance/api/v1/FeeGroup/GetFeeGroups',
  createComponent: 'schtrack-finance/api/v1/Component/NewComponent',
  fetchComponent: 'schtrack-finance/api/v1/Component/GetComponents',
  addNewFee: 'schtrack-finance/api/v1/Fee/NewFee',
  createInvoice: 'schtrack-finance/api/v1/Invoice/GenerateInvoice',
  getAllInvoices: 'schtrack-finance/api/v1/Invoice/GetAllInvoices',
  getInvoicepaymenthistory: 'schtrack-finance/api/v1/Invoice/GetPaymentHistoryInvoices',
  getpendingInvoicepaymen: 'schtrack-finance/api/v1/Invoice/GetPendingPaymentInvoices',
  getInvocesbyId: 'schtrack-finance/api/v1/Invoice/GetInvoice',
  getpaymentinvoices: 'schtrack-finance/api/v1/Invoice/GetPaymentInvoices',
  getinvoices: 'schtrack-finance/api/v1/Invoice/GetInvoices',

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

  createFeeGroup(feegroupdata) {
    const url = `${this.baseUrl + routes.addfeeGruop}`;
    return this.http.post(url, feegroupdata,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllFeeGroup() {
    const url = `${this.baseUrl + routes.getallfeeGruop}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createNewComponent(componentData) {
    const url = `${this.baseUrl + routes.createComponent}`;
    return this.http.post(url, componentData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getComponent() {
    const url = `${this.baseUrl + routes.fetchComponent}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  createFee(newAccountData) {
    const url = `${this.baseUrl + routes.addNewFee}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  generteInvoices(newAccountData) {
    const url = `${this.baseUrl + routes.createInvoice}`;
    return this.http.post(url, newAccountData,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getInvoicesById() {
    const url = `${this.baseUrl + routes.getInvocesbyId}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllCretedInvoices() {
    const url = `${this.baseUrl + routes.getAllInvoices}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getInvoicePaymentHistory() {
    const url = `${this.baseUrl + routes.getInvoicepaymenthistory}`;
    return this.http.get(url,  {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getPendingInvoicePayment() {
    const url = `${this.baseUrl + routes.getpendingInvoicepaymen}`;
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

 }
