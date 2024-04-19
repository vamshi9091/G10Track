import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserdepartmentService {

  baseUrl = environment.apiUrl;
  tokens: any = '';
  userDeptData: any = '';

  constructor(public http: HttpClient) {
    this.tokens = localStorage.getItem('token');
  }

  setUserDeptData(rowdata:any){
    this.userDeptData=rowdata;
  }
  getUserDeptData(){
    return this.userDeptData;
  }

  public saveUserDept(data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(this.baseUrl + "userDept/save-userdept", data, { headers });
  }

  public getUserDept() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.get(this.baseUrl + "userDept/get-userdept", { headers });
  }
  // http://localhost:9090/tenders/get-userdept

  public updateUserDept(id:any,data: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokens}`
    });
    return this.http.post(`${this.baseUrl}userDept/update/${id}`,data, { headers });
  }

}
