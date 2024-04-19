import { Component } from '@angular/core';
import { ListItemDto } from 'src/app/Beans/ListItem.bean';
import { ListService } from '../../service/list.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-list-item-update',
  templateUrl: './list-item-update.component.html',
  styleUrls: ['./list-item-update.component.css']
})
export class ListItemUpdateComponent {

  Listitemdto: ListItemDto = new ListItemDto();

  constructor(private listservice: ListService, private router: Router, private dialogref: MatDialogRef<ListItemUpdateComponent>) { }

  ngOnInit(): void {
    const emp = this.listservice.geteditListItem();
    console.log('emp', emp.id);

    if (emp) {
      this.Listitemdto.listItem = emp.listItem;
      this.Listitemdto.listName = emp.listName;
      this.Listitemdto.status = emp.status;
    }

  }

  onSubmit() {
    console.log("data:", this.Listitemdto)
    const emp = this.listservice.geteditListItem();
    console.log("data:", this.Listitemdto)
    this.listservice.updateListItems(emp.id, this.Listitemdto).subscribe((data: any) => {
      if (data) {
        console.log("this.listdata", this.Listitemdto);
        console.log('data', data);
        this.dialogref.close('refresh');

      }
    });
  }

  onBack() {
    this.dialogref.close();
  }
}
