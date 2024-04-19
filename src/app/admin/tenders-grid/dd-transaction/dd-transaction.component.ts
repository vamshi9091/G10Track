import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DdDto } from 'src/app/Beans/dd-dto.bean';

@Component({
  selector: 'app-dd-transaction',
  templateUrl: './dd-transaction.component.html',
  styleUrls: ['./dd-transaction.component.css']
})
export class DDTransactionComponent implements OnInit {

  // ddDto: DdDto = new DdDto();
    ddform!:FormGroup;
  constructor(private dialogref: MatDialogRef<DDTransactionComponent>,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
   this.ddform=this.formbuilder.group({
  issueDate: [''] ,
    clearDate: [''],
    bankName:[''] 
})
  }

  onSubmit() {
    console.log('this.ddDto', this.ddform.value);
    const DdDto = [{ 
    issueDate: this.ddform.value.issueDate,
    clearDate: this.ddform.value.clearDate,
    bankName: this.ddform.value.bankName,
    
    }];
    const onlinedDtoArray = Object.values(DdDto);
    localStorage.setItem('dd-Dto', JSON.stringify(onlinedDtoArray));
    // localStorage.setItem('dd-Dto',JSON.stringify(this.ddDto) );
    this.dialogref.close();
  }

}
