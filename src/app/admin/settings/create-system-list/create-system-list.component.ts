import { Component } from '@angular/core';
import { ListItemDto } from 'src/app/Beans/ListItem.bean';
import { ListService } from '../../service/list.service';
import { Router } from '@angular/router';
import { ListItemUpdateComponent } from '../list-item-update/list-item-update.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SystemListDto } from 'src/app/Beans/SystemList.bean';

@Component({
  selector: 'app-create-system-list',
  templateUrl: './create-system-list.component.html',
  styleUrls: ['./create-system-list.component.css']
})
export class CreateSystemListComponent {

  systemlistdto: SystemListDto = new SystemListDto();

  constructor(private listservice: ListService, private router: Router, private dialogref: MatDialogRef<ListItemUpdateComponent>) { }

  ngOnInit(): void {
    // const emp = this.listservice.geteditListItem();
    // console.log('emp', emp.id);

    // if (emp) {
    //   this.systemlistdto.name = emp.listName;
    //   this.systemlistdto.status = emp.status;
    // }
    this.listservice.getsystemlist().subscribe((data: any) => {
      if (data) {
        console.log("systemdata", data);
        // this.SystemList = data;
      }
    });

  }

  onSubmit() {
    console.log("data:", this.systemlistdto)
    // const emp = this.listservice.geteditListItem();
    console.log("data:", this.systemlistdto)
    this.listservice.createSystemListItems(this.systemlistdto).subscribe((data: any) => {
      if (data) {
        console.log("this.listdata", this.systemlistdto);
        console.log('data', data);
        this.dialogref.close('refresh');
      }else{
        console.log("error")
      }
    });
  }


  onBack() {
    this.dialogref.close();
  }
}
