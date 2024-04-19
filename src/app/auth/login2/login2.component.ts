import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { UserChange } from 'src/app/Beans/Changepasswaordbean';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {

  userdto: UserChange=new UserChange();
  hide: boolean = true;

  constructor(private router: Router,public authservice: AuthService) { }
  ngOnInit(): void {
    const authdata=this.authservice.decodedToken();
    console.log(authdata.sub)
    this.userdto.userName=authdata.sub;
  }
  newPassword: any='';
  confirmPassword: any='';
  username:any='';
  // submitForm(form: NgForm) {
  //   if (form.valid && this.newPassword === this.confirmPassword) {
     
  //   }
  // }
  
  onSubmit(){
    if(this.userdto.password){
     const authdata=this.authservice.decodedToken();
    console.log(authdata.sub)
    this.userdto.userName=authdata.sub;
// this.userdto.password=this.newPassword;
    console.log('userdtochange',this.userdto)
    this.authservice.updatepasswordlogin(this.userdto).subscribe((data:any)=>{
      console.log("change password data",data);
      if(data){
        this.router.navigate(['/home/dashboard']);
      }
    })
    }
  }

  back(): void {
    this.router.navigate(['/login']);
  }
  togglePasswordVisibility(): void {
    this.hide = !this.hide; // Toggle hide property to show/hide password
  }
}
