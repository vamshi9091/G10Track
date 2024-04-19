import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { RoleService } from 'src/app/auth/service/role.service';

@Component({
  selector: 'app-home-sidenav',
  templateUrl: './home-sidenav.component.html',
  styleUrls: ['./home-sidenav.component.css'],
})
export class HomeSidenavComponent implements OnInit {
  roles: any='';
  subname: any;
  
  constructor(private router: Router,public authservice:AuthService) {}
  ngOnInit(): void {
    const role=this.authservice.decodedToken();
    console.log("roleis:",role);
     this.roles=role;
    //  this.subname=sub;
  }
  logout() {
    // localStorage.removeItem('token');
    alert("Are you sure you want to logout?");
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  showSettingsDropdown = false;

  toggleSettingsDropdown() {
    this.showSettingsDropdown = !this.showSettingsDropdown;
  }
  hideSettingsDropdown() {
    this.showSettingsDropdown = false;
  }
}
