import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  tokens: any = '';
  employeedata: any = '';
  baseUrl = environment.apiUrl;
  constructor(public http: HttpClient) {
    this.tokens = localStorage.getItem('token');
  }

  public getEmployees() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "employees/get-emp", { headers });
  }

  public createEmployee(employeeDto: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + "employees/save-emp", employeeDto, { headers });
  }

  public updateEmployee(id: any, data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + `employees/update-emp/${id}`, data, { headers });
  }

  setEmployeeRowData(rowdata: any) {
    this.employeedata = rowdata;
  }

  getEmployeeRowData() {
    return this.employeedata;
  }

}
