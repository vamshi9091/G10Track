import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CheckDto } from 'src/app/Beans/check-dto.bean';

@Component({
  selector: 'app-check-transaction',
  templateUrl: './check-transaction.component.html',
  styleUrls: ['./check-transaction.component.css']
})
export class CheckTransactionComponent implements OnInit {

  // checkDto: CheckDto = new CheckDto();

  checkform!:FormGroup;

  constructor(private dialogref: MatDialogRef<CheckTransactionComponent>, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.checkform=this.formbuilder.group({
      bankName : [''] ,
      checkNo : [''],
      checkIssueDate :[''] ,
      checkClearDate :[''] ,
    })

  }

  onSubmit() {
    console.log('this.checkDto', this.checkform.value);

    // localStorage.setItem('checkDto',JSON.stringify(this.checkDto) );
    const CheckDto = [{ 
      bankName: this.checkform.value.bankName,
      checkNo: this.checkform.value.checkNo,
      checkIssueDate: this.checkform.value.checkIssueDate,
      checkClearDate: this.checkform.value.checkClearDate
      
      }];
      const onlinedDtoArray = Object.values(CheckDto);
      localStorage.setItem('checkDto', JSON.stringify(onlinedDtoArray));
    this.dialogref.close();
  }

}
