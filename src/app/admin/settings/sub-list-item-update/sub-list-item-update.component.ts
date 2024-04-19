import { Component } from '@angular/core';
import { ListItemDto } from 'src/app/Beans/ListItem.bean';
import { ListService } from '../../service/list.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SubListItemDto } from 'src/app/Beans/sublistitem-dto.bean';

@Component({
  selector: 'app-sub-list-item-update',
  templateUrl: './sub-list-item-update.component.html',
  styleUrls: ['./sub-list-item-update.component.css']
})
export class SubListItemUpdateComponent {
 
  subListItemDto: SubListItemDto = new SubListItemDto();
  constructor(private listservice: ListService, private router: Router, private dialogref: MatDialogRef<SubListItemUpdateComponent>) { }

  ngOnInit(): void {
    const emp = this.listservice.geteditListItem();
    console.log('emp', emp.id);

    if (emp) {
      this.subListItemDto.listItem = emp.listItem;
      this.subListItemDto.subListItem = emp.subListItem;
      this.subListItemDto.status = emp.status;
    }

  }

  onSubmit() {
    console.log("data:", this.subListItemDto)
    const emp = this.listservice.geteditListItem();
    console.log("data:", this.subListItemDto)
    this.listservice.updateSubListItems(emp.id, this.subListItemDto).subscribe((data: any) => {
      if (data) {
        console.log("this.listdata", this.subListItemDto);
        console.log('data', data);
        this.dialogref.close('refresh');
      }
    });
  }

  onBack() {
    this.dialogref.close();
  }
}
