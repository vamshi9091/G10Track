import { Component, OnInit } from '@angular/core';
import { EmployeeDto } from 'src/app/Beans/employee-dto.bean';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-create-tender',
  templateUrl: './employee-create-tender.component.html',
  styleUrls: ['./employee-create-tender.component.css']
})
export class EmployeeCreateTenderComponent implements OnInit {

  name: string = '';
  doj: string = '';
  designation: string = '';
  mail: string = '';
  ph: string = '';
  role: string = '';
  imgFileName: File | null = null;
  // Url: string | ArrayBuffer | null;

  constructor(private empService: EmployeeService, private router: Router,private dialogRef: MatDialogRef<EmployeeCreateTenderComponent>) { }

  ngOnInit(): void {

  }

  onFileChange(event: any) {
    this.imgFileName = event.target.files.item(0);
  }

  // uploadFile() {
  //   if (!this.imgFileName) {
  //     console.error("No file selected.");
  //     return;
  //   }
  // }
  onSubmit() {
    const formData: FormData = new FormData();
    // formData.append('file', this.imgFileName as File);
    formData.append('name',this.name);
    formData.append('doj', this.doj);
    formData.append('des', '');
    formData.append('mail', this.mail);
    formData.append('ph', this.ph);
    formData.append('role', this.role);

    this.empService.createEmployee(formData).subscribe((data: any) => {
      if (data) {
        console.log('this.employeeDto',formData );
        console.log('data', data);
        this.dialogRef.close('refresh'); 
        // this.router.navigate(['home/employee-get']);
      }
    });
  }



  // onSelectFile(event: any) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.Url = reader.result;
  //       // Convert image data to base64 string and assign it to employeeDto
  //       this.employeeDto.imageData = reader.result as string;
  //     };
  //   }
  // }

  // removeSelectFile() {
  //   this.imgFileName = undefined;
  //   this.Url = '';
  //   const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  //   if (fileInput) {
  //     fileInput.value = ''; // Reset the input field
  //   }
  // }

 
  // onSelectFile(event: any) {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length) {
  //     this.selectedFile = event.target.files[0];
  //     reader.readAsDataURL(this.selectedFile as Blob);

  //     reader.onload = () => {
  //       this.Url = reader.result as string;
  //     };
  //   }
  //   if (this.selectedFile) {
  //     this.imgFileName = this.selectedFile.name;
  //   }
  // }

  // removeSelectFile() {
  //   this.selectedFile = null;
  //   this.imgFileName = '';
  //   this.Url = '';
  //   const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  //   if (fileInput) {
  //     fileInput.value = ''; // Reset the input field
  //   }
  // }

}
