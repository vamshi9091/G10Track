import { Component, OnInit } from '@angular/core';
import { UserDeptDto } from 'src/app/Beans/userdeptdto.bean';
import { TenderService } from '../../service/tender.service';
import { UserdepartmentService } from '../../service/userdepartment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dept-create',
  templateUrl: './user-dept-create.component.html',
  styleUrls: ['./user-dept-create.component.css']
})
export class UserDeptCreateComponent implements OnInit {

  userDeptDto: UserDeptDto = new UserDeptDto();
  States: any = '';

  constructor(private tenderService: TenderService, private userDeptService: UserdepartmentService,
    private toaster: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.tenderService.getStates().subscribe((data: any) => {
      if (data) {
        this.States = data;
      }
    });
  }

  createUserDept() {
    this.userDeptService.saveUserDept(this.userDeptDto).subscribe((data: any) => {
      if (data) {
        console.log("this.userDeptDto", data);
        this.router.navigate(['home/user-dept']);
        this.toaster.success('User Department Saved Successfully!');
      }
    });
  }

}
