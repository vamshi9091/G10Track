import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Loginauth } from 'src/app/Beans/logindto.bean';
import { RoleService } from '../service/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  form!: FormGroup;
  submitted = false;
  invalid = false;
  user: Loginauth = new Loginauth();
  public redirectUrl!: string;
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService,
    private roleservice: RoleService, private formBuilder: FormBuilder,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;
    const loginauth = new Loginauth();
    loginauth.userName = formData.userName;
    loginauth.password = formData.password;
    console.log("logindetails:", loginauth);

    this.authService.login(loginauth).subscribe((data: string) => { // Change the type of data to string
      if (data) {

        console.log("token:", data);

        this.authService.storeToken(data);
        const tokenPayload = this.authService.decodedToken();
        console.log("decodedToken in login", tokenPayload);
        if(tokenPayload.isFirstLogin===true){
          this.router.navigate(['login/changepassword'])
        }else{
          if (tokenPayload && tokenPayload.roles[0]) {
            const role = tokenPayload.roles[0]; // Extract the role from the decoded token
            this.roleservice.setRoleForStore(role);
            // this.roleservice.setRoleForadmin(tokenPayload);
  
            // Check the role and navigate accordingly
            if (role === "ROLE_ADMIN") {
              console.log("Logged Role_Admin");
              // this.toastr.success("Successfully Login", "admin");
              localStorage.setItem("userRole", "ROLE_ADMIN");
              this.isLoggedIn = true;
              this.router.navigate(["/home/dashboard"]);
            } else if (role === "ROLE_USER") {
              console.log("mydata");
              localStorage.setItem("userRole", "ROLE_USER");
              // this.toastr.success("Successfully Login", "AdminSale");
              this.router.navigate(["/home/dashboard"]);
            } else {
              // Handle unknown role
              console.log("Unknown role:", role);
              this.toastr.error('Unknown role', 'Login Error');
            }
  
          } else {
            this.toastr.error('Role information missing in the token payload', 'Login Error');
            return;
          }
        }
      } else {
        console.log("token not going");
      }
    });

  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.login();
      this.hide = false;
    }
  }

}
