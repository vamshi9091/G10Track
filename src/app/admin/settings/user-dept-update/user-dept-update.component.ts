import { Component, OnInit } from '@angular/core';
import { UserDeptDto } from 'src/app/Beans/userdeptdto.bean';
import { TenderService } from '../../service/tender.service';
import { UserdepartmentService } from '../../service/userdepartment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dept-update',
  templateUrl: './user-dept-update.component.html',
  styleUrls: ['./user-dept-update.component.css']
})
export class UserDeptUpdateComponent implements OnInit {

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

    const userDept = this.userDeptService.getUserDeptData();
    console.log('userDept', userDept);
    if (userDept) {
      this.userDeptDto.id = userDept.id;
      this.userDeptDto.deptName = userDept.deptName;
      this.userDeptDto.address = userDept.address;
      this.userDeptDto.state = userDept.state;
      this.userDeptDto.country = userDept.country;
    }
  }

  onSubmit() {
    this.userDeptService.updateUserDept(this.userDeptDto.id, this.userDeptDto).subscribe((data: any) => {
      if (data) {
        console.log('data', data);
        console.log('this.userDeptDto update', this.userDeptDto);
        this.router.navigate(['home/user-dept']);
      }
    });
  }

}
