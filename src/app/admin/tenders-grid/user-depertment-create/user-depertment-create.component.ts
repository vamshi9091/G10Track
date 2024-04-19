import { Component, OnInit } from '@angular/core';
import { UserDeptDto } from 'src/app/Beans/userdeptdto.bean';
import { TenderService } from '../../service/tender.service';
import { UserdepartmentService } from '../../service/userdepartment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-depertment-create',
  templateUrl: './user-depertment-create.component.html',
  styleUrls: ['./user-depertment-create.component.css']
})
export class UserDepertmentCreateComponent implements OnInit {
  userDeptDto: UserDeptDto = new UserDeptDto();
  States: any = '';

  constructor(private tenderService: TenderService, private userDeptService: UserdepartmentService,
    private toaster: ToastrService, private router: Router,private dialogRef: MatDialogRef<UserDepertmentCreateComponent>) { }

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
        // this.router.navigate(['home/user-dept']);
        this.dialogRef.close('refresh'); 
        this.toaster.success('User Department Saved Successfully!');
      }
    });
  }
}
