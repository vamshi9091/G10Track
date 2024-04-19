import { Component } from '@angular/core';
import { NotesDto } from 'src/app/Beans/notesdto.beans';
import { TenderService } from '../../service/tender.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-savetendersubstatus',
  templateUrl: './savetendersubstatus.component.html',
  styleUrls: ['./savetendersubstatus.component.css']
})
export class SavetendersubstatusComponent {
  Notesdto: NotesDto = new NotesDto();
  constructor(private tenderservice: TenderService, private authservice: AuthService,
     private formBuilder: FormBuilder, private toastr: ToastrService, private dialogRef: MatDialogRef<SavetendersubstatusComponent>,
    private dialog: MatDialog) {
  }
  onSubmitnote() {
    console.log("Note:", this.Notesdto.note);
    const tenderdata = this.tenderservice.getTenderData();
    console.log(tenderdata.tenderNum);
    const authdata = this.authservice.decodedToken();
    console.log(authdata.sub)
    this.Notesdto.loggedBy = authdata.sub;
    const currentDate = new Date();
    const logTime: any = formatDate(new Date(), " yyyy-MM-dd'T'HH:mm:ss' ", 'en');
    this.Notesdto.loggedTime = logTime;
  console.log("notes:",this.Notesdto)
    this.tenderservice.postTenderNotes(authdata.sub, tenderdata.id, this.Notesdto).subscribe((data: any) => {
      if (data) {
        console.log('data', data);
        console.log('this.Notesdto', this.Notesdto);
        // alert("Your Notes is Sumitted");
        this.dialogRef.close('refresh');
      }
    });
  }
  

}
