import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from 'src/app/Beans/userdto.bean';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userPayload: any;
  isLogged: boolean = false;

  constructor(public http: HttpClient) {
    this.userPayload = this.decodedToken()
  }
  baseUrl = environment.apiUrl;

  // login(data: any) {
  //   return this.http.post(this.baseUrl + "tenders/authenticate", data);
  // }

  login(data: any) { // Change the return type to Observable<string>
    return this.http.post(this.baseUrl + "tenders/authenticate", data, { responseType: 'text' });
  }
  updatepasswordlogin(data: any) {
    console.log("data",data) // Change the return type to Observable<string>
    return this.http.post(this.baseUrl + "users/update-password", data)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
    console.log('storeToken', tokenValue);
    sessionStorage.setItem('sessionToken', tokenValue);
    console.log('sessionToken', tokenValue);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    // console.log("decodedToken", token);
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }


  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }
}
