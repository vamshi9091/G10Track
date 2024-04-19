import { RoleService } from './../../auth/service/role.service';
import { Component, EventEmitter, Output } from '@angular/core';

import { Chart, ChartDataset } from 'chart.js/auto';
import { TenderService } from '../service/tender.service';
import { DashboardService } from '../service/dashboard.service';
import { Route, Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { ListService } from '../service/list.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stateList: any = '';
  verticalList: any = '';
  states: any = '';
  verticals: any = '';
  tendersDashboardData: any = '';
  taskStatuses: any='';
  roles:any='';
  selectedRange: string = '';
  fromDate: Date | null = null;
  toDate: Date | null = null;

  tenderStatusData: any[] = [];
  chartLabels: string[] = [];
  chartData: ChartDataset[] = [];
  chartType: string = 'bar';
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  constructor(private tenderservice: TenderService, private dashService: DashboardService,private router: Router,private roleService:RoleService,private ListService:ListService) { }

  ngOnInit(): void {
   
    this.tenderservice.getStates().subscribe((data: any) => {
      this.stateList = data.data;
    });

    // this.tenderservice.getVerticals().subscribe((data: any) => {
    //   this.verticalList = data.data;
    // });

    this.ListService.getListItemBySysListname('Verticals').subscribe((data: any) => {
      this.verticalList = data.data;
    })

    this.dashService.getAllData().subscribe((data:any)=>{
      this.tendersDashboardData= data.data;
      console.log("dashboarddata", this.tendersDashboardData)
    })

    this.dashService.getGraphstatus().subscribe((data:any)=>{
      if(data){
        this.taskStatuses = this.formatData(data);
        console.log("graphdata",this.taskStatuses)
        this.createChart(this.taskStatuses);
      }
    })
    
    const role=localStorage.getItem('userRole');
     console.log("roleis:",role);
      this.roles=role;
      const { fromDate, toDate } = this.getDateRangeForLastFourMonths();
      this.fetchTenderStatusCounts(fromDate, toDate);
  }
  formatData(data: any): any {
    const formattedData: { [key: string]: any } = {}; // Define type for formattedData
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
        const value = data[key];
        if (value !== undefined) {
          formattedData[formattedKey] = value;
        }
      }
    }
    return formattedData;
  }

  createChart(statusData:any) {

    const statusNames = Object.keys(statusData);
    console.log(statusNames)
    const taskCounts = Object.values(statusData);
    // const backgroundColors = this.generateRandomColors(statusNames.length);
    // const borderColors = backgroundColors.map(color => this.generateBorderColor(color));
  
    const myChart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: statusNames,
        datasets: [{
            label: "# of Tender Status",
            data: taskCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
      },

     options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        maintainAspectRatio: false
      }
    });
    
    document.getElementById("MyChart")!.onclick = (evt: MouseEvent) => {
      const activePoint = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false)[0];
  
      if (activePoint && myChart.data && myChart.data.labels) {
        const taskName = myChart.data.labels[activePoint.index];
        // Handle click event as needed
        console.log("Clicked on task:", taskName);
        this.navigateToTaskDetails(taskName);
      }
    };
  }
  // @Output() verticalChange: EventEmitter<any> = new EventEmitter<any>();
  navigateToTaskDetails(taskName: any) {
    
    console.log('taskName', taskName);
    this.dashService.setStatusName(taskName);
    this.router.navigate(['home/dashboard-graphtenders']);
  }
  onChangeVertical(event: any) {
    if (event) {
      console.log('vertical event:', event);
      this.verticals = event;
      console.log('vertical:', this.verticals);
      // this.verticalChange.emit(event); // Emitting the event  
    } else {
      this.verticals = '';
    }
  }
 

  onChangeState(event: any) {
    if (event) {
      console.log('state event:', event);
      this.states = event;
      console.log('state:', this.states);
    } else {
      this.states = '';
    }
  }
  getAllTendersbyNumber(){  
    // this..setStatusName(taskName);
    this.dashService.setVertical(this.verticals);
    this.dashService.setState(this.states);
    this.dashService.setfromDate(this.fromDate!);
    this.dashService.setToDate(this.toDate!);
    this.router.navigate(['home/dashboard-alltenders']);
  }
  getAllTendersbyAwarded(){
    
    // this..setStatusName(taskName);
    this.dashService.setVertical(this.verticals);
    this.dashService.setState(this.states);
    this.dashService.setfromDate(this.fromDate!);
    this.dashService.setToDate(this.toDate!);
    this.router.navigate(['home/dashboard-awardedtenders']);
  }
  getAllTendersbyParticipated(){
    this.dashService.setVertical(this.verticals);
    this.dashService.setState(this.states);
    this.dashService.setfromDate(this.fromDate!);
    this.dashService.setToDate(this.toDate!);
    this.router.navigate(['home/dashboard-participatedtenders']);
  }
  getAllTendersbyNotAwarded(){
  this.dashService.setVertical(this.verticals);
  this.dashService.setState(this.states);
  this.dashService.setfromDate(this.fromDate!);
  this.dashService.setToDate(this.toDate!);
  this.router.navigate(['home/dashboard-notawardedtenders']);
   }
  onSearch() {
    console.log("customdate:",this.selectedRange)
    console.log("fromdate:",this.fromDate)
    console.log("todate:",this.toDate)
    if (this.verticals && this.states && this.fromDate && this.toDate ) {
      this.dashService.getAllDataByStatesAndVerticalsandDate(this.states, this.verticals,this.fromDate,this.toDate).subscribe((data: any) => {
        if (data) {
          this.tendersDashboardData = data.data;
          console.log('states & verticals', this.tendersDashboardData);
        }
      });
    }else if(this.verticals && this.fromDate && this.toDate) {
      this.dashService.getAllDataByVerticalsandDate( this.verticals,this.fromDate,this.toDate).subscribe((data: any) => {
        if (data) {
          this.tendersDashboardData = data.data;
          console.log('states & verticals', this.tendersDashboardData);
        }
      });
    }else if(this.states && this.fromDate && this.toDate) {
      this.dashService.getAllDataByStateandDate( this.states,this.fromDate,this.toDate).subscribe((data: any) => {
        if (data) {
          this.tendersDashboardData = data.data;
          console.log('states & verticals', this.tendersDashboardData);
        }
      });
    }
    else if(this.verticals && this.states ) {
      this.dashService.getAllDataByStatesAndVerticals(this.states, this.verticals).subscribe((data: any) => {
        if (data) {
          this.tendersDashboardData = data.data;
          console.log('states & verticals', this.tendersDashboardData);
        }
      });
    }
    else if (this.verticals) {
      this.dashService.getAllDataByVerticals(this.verticals).subscribe((data: any) => {
        if (data) {
          this.tendersDashboardData = data.data;
          console.log('vertical data', this.tendersDashboardData);
        }
      });
    } else if (this.states) {
      this.dashService.getAllDataByStates(this.states).subscribe((data: any) => {
        if (data) {
          this.tendersDashboardData = data.data;
          console.log('states data', this.tendersDashboardData);
        }
      });
    }else if(this.fromDate && this.toDate  ) {
      this.dashService.getAllDataByDate(this.fromDate, this.toDate).subscribe((data: any) => {
        if (data) {
          this.tendersDashboardData = data.data;
          console.log('this.fromDate && this.toDate ', this.tendersDashboardData);
        }
      });
    }
  }
 
  onRangeChange() {
    switch (this.selectedRange) {
      case "today":
        // const date1: any = formatDate(new Date(), 'yyyy-MM-dd', 'en');
       
        // this.transactionDetails.transactionDate=date1;
        const today:any = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this.fromDate = today;
        this.toDate = today;
        console.log("customdate: today", today);
        console.log("fromdate:", this.fromDate);
        console.log("todate:", this.toDate);
        break;
        case "yesterday":
          const yesterday = new Date(); // Get today's date
          yesterday.setDate(yesterday.getDate() - 1); // Set it to yesterday
          const formattedDate:any = formatDate(yesterday, 'yyyy-MM-dd', 'en'); // Format yesterday's date
          this.fromDate = formattedDate; // Assign yesterday's formatted date to fromDate
          this.toDate = formattedDate; // Assign yesterday's formatted date to toDate
          console.log("customdate: yesterday", formattedDate);
          console.log("fromdate:", this.fromDate);
          console.log("todate:", this.toDate);
          break;
      case "this_week":
       
      const today1 = new Date(); // Get today's date
      const startOfWeek = new Date(today1); // Clone today's date
      startOfWeek.setDate(today1.getDate() -(today1.getDay()+5) ); // Set it to the start of the week (Sunday)
    
      const endOfWeek = new Date(today1); // Clone today's date
      endOfWeek.setDate(today1.getDate()); // Set it to the end of the week (Saturday)
    
      const formattedStartDate:any = formatDate(startOfWeek, 'yyyy-MM-dd', 'en'); // Format start of week
      const formattedEndDate:any = formatDate(endOfWeek, 'yyyy-MM-dd', 'en'); // Format end of week
    
      this.fromDate = formattedStartDate; // Assign formatted start of week to fromDate
      this.toDate = formattedEndDate; // Assign formatted end of week to toDate
    
      console.log("customdate: this_week", formattedStartDate, formattedEndDate);
      console.log("fromdate:", this.fromDate);
      console.log("todate:", this.toDate);
      break;
      case "custom":
        // No need to update here, handled by input fields
        break;
      default:
        // Do nothing or handle as needed
        break;
    }
  }
  


  // monthly graph status

  getDateRangeForLastFourMonths(): { fromDate: string, toDate: string } {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
  
    // Calculate the fromDate (4 months before the current date)
    const fromDate = new Date(currentYear, currentMonth - 4, 1).toISOString().slice(0, 10);
  
    // Calculate the toDate (current date)
    const toDate = today.toISOString().slice(0, 10);
  
    return { fromDate, toDate };
  }

  // fetchTenderStatusCounts(fromDate: string, toDate: string) {
  //   this.dashService.getGraphMonthstatus(fromDate, toDate)
  //     .subscribe((data:any) => {
  //       this.tenderStatusData = Object.entries(data).map(([key, value]) => ({ month: key, count: value }));
  //       this.chartLabels = this.tenderStatusData.map(item => item.month);
  //       this.chartData = this.tenderStatusData.map(item => item.count);
  //     });
  // }

  fetchTenderStatusCounts(fromDate: string, toDate: string) {
    this.dashService.getGraphMonthstatus(fromDate, toDate)
      .subscribe((data: any) => {
        this.tenderStatusData = Object.entries(data).map(([key, value]) => ({ month: key, count: value }));
        this.chartLabels = this.tenderStatusData.map(item => item.month);
        this.chartData = [{ data: this.tenderStatusData.map(item => item.count), label: 'Tender Status Counts' }];
      });
  }

  
  
}

