import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserDeptDto } from 'src/app/Beans/userdeptdto.bean';
import { UserdepartmentService } from '../../service/userdepartment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDeptCreateComponent } from '../../settings/user-dept-create/user-dept-create.component';
import { UserDepertmentCreateComponent } from '../user-depertment-create/user-depertment-create.component';

@Component({
  selector: 'app-user-department-get',
  templateUrl: './user-department-get.component.html',
  styleUrls: ['./user-department-get.component.css']
})

export class UserDepartmentGetComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'id',
    'deptName',
    'address',
    'state',
    'country'
  ];

  dataSource!: MatTableDataSource<UserDeptDto>;
  selection = new SelectionModel<any>(true, []);
  selectedRow: UserDeptDto | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // user: User = new User();

  @Output() userDepartmentSelected = new EventEmitter<UserDeptDto>();

  constructor(private router: Router, private userDeptService: UserdepartmentService, private dialogRef: MatDialogRef<UserDepartmentGetComponent>,private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.user = this.authSevice.getUser();

    this.getAlluserDept();
  }

  getAlluserDept() {
    this.userDeptService.getUserDept().subscribe((data: any) => {
      if (data && data.data) {
        console.log("data", data.data)
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }else{
        alert("First Select State")
        console.log("No data available. Please select a state.");
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

  selectUserDepartment() {
    // const selecteduserdept = this.selection.selected[0];
    // if (selecteduserdept) {
    //   this.userDepartmentSelected.emit(selecteduserdept);
    //   this.dialogRef.close();
    // }
    if (this.selectedRow) {
      this.userDepartmentSelected.emit(this.selectedRow);
      // this.dialogRef.close();
      this.dialogRef.close('refresh');
    }
  }
  selectRow(row: any) {
    this.selectedRow = row;
    }
    

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected() && this.dataSource) {
      this.selection.clear();
      return;
    }

    if (this.dataSource) {
      this.selection.select(...this.dataSource.data);
    }

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserDeptDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    if (this.dataSource) {
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    return '';
  }
  createuserdepartment(){
    const dialogRef = this.dialog.open(UserDepertmentCreateComponent, {
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAlluserDept();

      }
    });
    // this.router.navigate(['home/userdept-create']);
  }
  // checkboxLabel(row?: UserDeptDto): string {
  //   if (!row) {
  //     return '';
  //   }
  //   return `${this.selectedRow === row ? 'selected' : 'not selected'}`;
  // }

}
