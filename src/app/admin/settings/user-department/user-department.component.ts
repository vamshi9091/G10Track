import { Component, OnInit, ViewChild } from '@angular/core';
import { UserdepartmentService } from '../../service/userdepartment.service';
import { Router } from '@angular/router';
import { UserDeptDto } from 'src/app/Beans/userdeptdto.bean';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-department',
  templateUrl: './user-department.component.html',
  styleUrls: ['./user-department.component.css']
})
export class UserDepartmentComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'deptName',
    'address',
    'state',
    'country',
    'action'
  ];

  dataSource!: MatTableDataSource<UserDeptDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // user: User = new User();

  constructor(private router: Router, private userDeptService: UserdepartmentService) { }

  ngOnInit(): void {

    this.getAlluserDept();
  }

  getAlluserDept() {
    this.userDeptService.getUserDept().subscribe((data: any) => {
      if (data) {
        console.log("data", data.data)
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUserDept(rowData: any) {
    console.log('editUserDept', rowData);
    this.userDeptService.setUserDeptData(rowData);
    this.router.navigate(['home/user-dept-update']);
  }

  createUserDept(): void {
    this.router.navigate(['home/userdept-create']);
  }

  // userDeptDto: UserDeptDto = new UserDeptDto();
  // States: any = '';

  // constructor(private tenderService: TenderService, private userDeptService: UserdepartmentService,
  //   private toaster: ToastrService, private router: Router) { }

  // ngOnInit(): void {

  //   this.tenderService.getStates().subscribe((data: any) => {
  //     if (data) {
  //       this.States = data;
  //     }
  //   });
  // }

  // createUserDept() {
  //   this.userDeptService.saveUserDept(this.userDeptDto).subscribe((data: any) => {
  //     if (data) {
  //       console.log("this.userDeptDto", data);
  //       this.router.navigate(['home/tender-get']);
  //       this.toaster.success('User Department Saved Successfully!');
  //     }
  //   });
  // }

}
