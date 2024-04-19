import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListService } from '../../service/list.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListItemUpdateComponent } from '../list-item-update/list-item-update.component';
import { SystemListDto } from 'src/app/Beans/SystemList.bean';
import { ListItemDto } from 'src/app/Beans/ListItem.bean';
import { CreateSystemListComponent } from '../create-system-list/create-system-list.component';
import { SubListItemDto } from 'src/app/Beans/sublistitem-dto.bean';
import { SubListItemUpdateComponent } from '../sub-list-item-update/sub-list-item-update.component';
// import { ListItemDto } from 'src/app/Beans/ListItem.bean';
// import { ListItemUpdateComponent } from '../list-item-update/list-item-update.component';

@Component({
  selector: 'app-systemlist',
  templateUrl: './systemlist.component.html',
  styleUrls: ['./systemlist.component.css']
})

export class SystemlistComponent implements OnInit {


  displayedColumns: string[] = [
    // 'id',
    "listName",
    "listItem",
    "status",
    'action',
  ];
  displayedColumns1: string[] = [
    // 'id',
    
    "subListItem",
    "status",
    'action',
  ];

  isAdd: boolean = false;
  sublistItemdto:SubListItemDto =new SubListItemDto();
  listItemDto: ListItemDto = new ListItemDto();
  SystemLists: SystemListDto = new SystemListDto();
  SystemList: any = '';
  ListItem:any ='';
  sysListId: any = '';
  sysListName: any = '';
  lastClickTime: number = 0;
  subListId: any = '';
  subListName: any = '';
  isAddSubListItem:boolean=false;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource2!: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator2!: MatPaginator;
  // @ViewChild('paginator') paginator1!: MatPaginator;
  // @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  newsublistname: any='';

  // pageSize1 = 5; // Initial page size
  // pageEvent1: PageEvent | undefined; 
  // pageSize2 = 5; // Initial page size
  // pageEvent2: PageEvent | undefined;
  constructor(private router: Router, private dialog: MatDialog, private ListService: ListService) { }

  ngOnInit(): void {

   this.getsyslist();

  
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator1;
  //   this.dataSource2.paginator = this.paginator2;
  // }

  // Method to handle paginator initialization for the second table
  
  getsyslist(){
    this.ListService.getsystemlist().subscribe((data: any) => {
      if (data) {
        console.log("systemdata", data);
        this.SystemList = data;
      }
    });
  }
  

  getListItems() {
    if (this.sysListId) {
      console.log('this.sysListId', this.sysListId);
      this.ListService.getListItemBySysList(this.sysListId).subscribe((data: any) => {
        if (data && data.data) {
this.ListItem=data;
          console.log("data", data.data)
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    } else {
      console.log('sysListId is null or undefined');
    }
  }


  onSubmit() {
    console.log("data:", this.listItemDto)
    this.listItemDto.listName=this.sysListName;
      // const listitemdtodata=this.listItemDto
    this.ListService.createListItems(this.sysListName, this.listItemDto).subscribe((data: any) => {
      if (data) {
        console.log("this.listdata", this.listItemDto);
        console.log('data', data);
        this.clearFormData();
        this.getListItems();
      }
    });
  }
  onSubmitSublist(){
    console.log(this.sublistItemdto)
    this.sublistItemdto.listItem=this.subListName;
    this.ListService.createsubListItems(this.subListName, this.sublistItemdto).subscribe((data: any) => {
      if (data) {
        console.log("this.listdata", this.sublistItemdto);
        console.log('data', data);
        this.clearFormData();
        this.getListItems();
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


  editListItem(rowData: any) {
    console.log('settender', rowData);
    this.ListService.seteditListItem(rowData);
    // this.router.navigate(['home/']);
    const listItemDialogRef = this.dialog.open(ListItemUpdateComponent, {
      'width': '40%',
      'height': '48%'
    });

    listItemDialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getListItems();
      }
    });
  }


  onChange(event: any) {
    if (event) {
      const [selectedId, selectedName] = event.split(',');
      this.sysListId = selectedId;
      this.sysListName = selectedName;
      this.isAdd = true;
      if(selectedName==="Tender Status" || selectedName==='Verticals'){
this.isAddSubListItem=true
      }else{
        this.isAddSubListItem=false;
      }
      console.log("this.sysListId", this.sysListId);
      console.log("this.sysListName", this.sysListName);
      this.getListItems();
    }
  }

  onChangeSublistname(event:any){
    if(event){
      const [selectedId, selectedName] = event.split(',');
      this.subListId = selectedId;
      this.subListName = selectedName;
      console.log("this.subListId", this.subListId);
      console.log("this.subListName", this.subListName);
    }
  }


  addTo() {
    this.isAdd = true;
  }


  closeForm(): void {
    // Additional logic if needed
    this.isAdd = false;
    this.listItemDto = {
      id: 0,
      listName: '',
      listItem: '',
      status: ''
    }
  }

  closeForm2(): void {
    // Additional logic if needed
    this.isAddSubListItem = false;
    this.listItemDto = {
      id: 0,
      listName: '',
      listItem: '',
      status: ''
    }
  }

  clearFormData() {
    this.listItemDto = {
      id: 0,
      listName: '',
      listItem: '',
      status: ''
    }
  }
openSystemlistform(){
  const listItemDialogRef = this.dialog.open(CreateSystemListComponent, {
    'width': '40%',
    'height': '40%'
  });

  listItemDialogRef.afterClosed().subscribe(result => {
    if (result === 'refresh') {
      this.getsyslist();
    }
  });
}
onRowClick(event: Event, rowData: any) {

    // If the time between two clicks is less than 300ms, consider it a double click
    this.newsublistname=rowData.listItem;

    console.log(this.newsublistname)
  this.getSubListItems();
}



getSubListItems() {
  if (this.newsublistname) {
    console.log('this.SubsysListId', this.newsublistname);
    this.ListService.getSubListItemBylistname(this.newsublistname).subscribe((data: any) => {
      if (data && data.data) { // Check if data and data.data exist
        this.dataSource2 = new MatTableDataSource(data.data);
        console.log('this.SubsysList data',  this.dataSource2);
        this.dataSource2.sort = this.sort;
        // this.dataSource2.paginator = this.paginator2;
      }
    });
  } else {
    console.log('newsublistname is null or undefined');
  }
}
editSubListItem(rowData: any) {
  console.log('settender', rowData);
  this.ListService.seteditListItem(rowData);
  // this.router.navigate(['home/']);
  const listItemDialogRef = this.dialog.open(SubListItemUpdateComponent, {
    'width': '40%',
    'height': '48%'
  });

  listItemDialogRef.afterClosed().subscribe(result => {
    if (result === 'refresh') {
      this.getSubListItems();
    }
  });
}

}
