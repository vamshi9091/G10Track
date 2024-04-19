import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeDto } from 'src/app/Beans/employee-dto.bean';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employeeDto: EmployeeDto = new EmployeeDto();
  imageData: File | null = null;
empid:any;
role:any;
  constructor(private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    const emp = this.empService.getEmployeeRowData();
    console.log('emp', emp);
    if (emp) {
      this.employeeDto.empid = emp.empid;
      this.employeeDto.name = emp.name;
      this.employeeDto.doj = emp.doj;
      // this.employeeDto.designation = emp.designation;
      this.employeeDto.emaiid=emp.emaiid;
      this.employeeDto.phoneNum=emp.phoneNum;
      this.employeeDto.imageData=emp.imageData;
      this.employeeDto.role=emp.role 
    }

  }

  onSubmit() {
    const formData: FormData = new FormData();
    // formData.append('file', this.imageData as File);
    formData.append('id',this.empid);
    formData.append('name',this.employeeDto.name);
    formData.append('doj', this.employeeDto.doj );
    formData.append('des',   '');
    formData.append('mail', this.employeeDto.emaiid);
    formData.append('ph', this.employeeDto.phoneNum);
    formData.append('role', this.employeeDto.role);

    this.empService.updateEmployee(this.employeeDto.empid,formData).subscribe((data: any) => {
      if (data) {
        console.log("this.employeeDto", this.employeeDto);
        console.log('data', data);
        this.router.navigate(['home/employee-get']);
      }
    });
  }

  onFileChange(event: any) {
    this.imageData = event.target.files.item(0);
  }
  onBack() {
    this.router.navigate(['home/employee-get']);
  }

}
