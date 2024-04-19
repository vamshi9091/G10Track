import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OnlineDto } from 'src/app/Beans/online-dto.bean';
import { TransactionDetailsDto } from 'src/app/Beans/transaction-details-dto.bean';

@Component({
  selector: 'app-online-transaction',
  templateUrl: './online-transaction.component.html',
  styleUrls: ['./online-transaction.component.css'],
})
export class OnlineTransactionComponent implements OnInit {
  onlineForm!: FormGroup;
  // onlineDto: OnlineDto = new OnlineDto();
  transactionDetails: TransactionDetailsDto = new TransactionDetailsDto();
  onlines: OnlineDto[] = [];
  online: OnlineDto = new OnlineDto();
  @Output() userDepartmentSelected = new EventEmitter<OnlineDto>();

  constructor(
    private dialogref: MatDialogRef<OnlineTransactionComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.onlineForm = this.formBuilder.group({
      bankName: [''],
      transactionNo: [''],
    });
  }


  
  onSubmit() {
    console.log('this.onlineDto', this.onlineForm.value);

    const onlinedDtos = [{
      bankName: this.onlineForm.value.bankName,
      transactionNo: this.onlineForm.value.transactionNo,
    
    }];
    
    // Convert object values to an array
    const onlinedDtoArray = Object.values(onlinedDtos);
    
    // Store the array in localStorage
    localStorage.setItem('onlinedto1', JSON.stringify(onlinedDtoArray));

    this.dialogref.close();
    
  }
}
