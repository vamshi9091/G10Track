import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TendersGetComponent } from './tenders-grid/tenders-get/tenders-get.component';
import { TenderCreateComponent } from './tenders-grid/tender-create/tender-create.component';
import { TenderUpdateComponent } from './tenders-grid/tender-update/tender-update.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDepartmentComponent } from './settings/user-department/user-department.component';
import { UserDepartmentGetComponent } from './tenders-grid/user-department-get/user-department-get.component';
import { HomeSidenavComponent } from './home-sidenav/home-sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeGetComponent } from './Employee-grid/employee-get/employee-get.component';
import { EmployeeUpdateComponent } from './Employee-grid/employee-update/employee-update.component';
import { EmployeeCreateComponent } from './Employee-grid/employee-create/employee-create.component';
import { TransactionDetailsComponent } from './tenders-grid/transaction-details/transaction-details.component';
import { OnlineTransactionComponent } from './tenders-grid/online-transaction/online-transaction.component';
import { DDTransactionComponent } from './tenders-grid/dd-transaction/dd-transaction.component';
import { CheckTransactionComponent } from './tenders-grid/check-transaction/check-transaction.component';
import { LiveTendersComponent } from './tenders-grid/live-tenders/live-tenders.component';
import { SystemlistComponent } from './settings/systemlist/systemlist.component';
import { ListItemUpdateComponent } from './settings/list-item-update/list-item-update.component';
import { DashboardAllTendersGetComponent } from './tenders-grid/dashboard-all-tenders-get/dashboard-all-tenders-get.component';
import { DashboardAwardedTendersGetComponent } from './tenders-grid/dashboard-awarded-tenders-get/dashboard-awarded-tenders-get.component';
import { UserDeptCreateComponent } from './settings/user-dept-create/user-dept-create.component';
import { UserDeptUpdateComponent } from './settings/user-dept-update/user-dept-update.component';
import { TransactionDetailsViewComponent } from './tenders-grid/transaction-details-view/transaction-details-view.component';
import { CreateSystemListComponent } from './settings/create-system-list/create-system-list.component';
import { PayableTendersComponent } from './tenders-grid/payable-tenders/payable-tenders.component';
import { RecivebleTendersComponent } from './tenders-grid/reciveble-tenders/reciveble-tenders.component';
import { DashboardthemeComponent } from './dashboardtheme/dashboardtheme.component';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeGetTenderComponent } from './tenders-grid/employee-get-tender/employee-get-tender.component';
import { EmployeeCreateTenderComponent } from './tenders-grid/employee-create-tender/employee-create-tender.component';
import { UserDepertmentCreateComponent } from './tenders-grid/user-depertment-create/user-depertment-create.component';
import { TransactionDetailsUpdateComponent } from './tenders-grid/transaction-details-update/transaction-details-update.component';
import { DashboardParticipatedTendersGetComponent } from './tenders-grid/dashboard-participated-tenders-get/dashboard-participated-tenders-get.component';
import { DashboardNotawardedTendersGetComponent } from './tenders-grid/dashboard-notawarded-tenders-get/dashboard-notawarded-tenders-get.component';
import { DashboardGraphGetTendersComponent } from './tenders-grid/dashboard-graph-get-tenders/dashboard-graph-get-tenders.component';
import { TransactionDetailsRecieveComponent } from './tenders-grid/transaction-details-recieve/transaction-details-recieve.component';
import { HistoryTrackComponent } from './tenders-grid/history-track/history-track.component';
import { SubListItemUpdateComponent } from './settings/sub-list-item-update/sub-list-item-update.component';
import { SavetendersubstatusComponent } from './tenders-grid/savetendersubstatus/savetendersubstatus.component';
// import { SystemlistComponent } from './settings/systemlist/systemlist.component';
// import { HomeFooterComponent } from './home-footer/home-footer.component';


@NgModule({
  declarations: [
    TendersGetComponent,
    TenderCreateComponent,
    TenderUpdateComponent,
    UserDepartmentComponent,
    UserDepartmentGetComponent,
    HomeSidenavComponent,
    DashboardComponent,
    EmployeeGetComponent,
    EmployeeUpdateComponent,
    EmployeeCreateComponent,
    TransactionDetailsComponent,
    OnlineTransactionComponent,
    DDTransactionComponent,
    CheckTransactionComponent,
    LiveTendersComponent,
    SystemlistComponent,
    ListItemUpdateComponent,
    DashboardAllTendersGetComponent,
    DashboardAwardedTendersGetComponent,
    UserDeptCreateComponent,
    UserDeptUpdateComponent,
    TransactionDetailsViewComponent,
    CreateSystemListComponent,
    PayableTendersComponent,
    RecivebleTendersComponent,
    DashboardthemeComponent,
    EmployeeGetTenderComponent,
    EmployeeCreateTenderComponent,
    UserDepertmentCreateComponent,
    TransactionDetailsUpdateComponent,
    DashboardParticipatedTendersGetComponent,
    DashboardNotawardedTendersGetComponent,
    DashboardGraphGetTendersComponent,
    TransactionDetailsRecieveComponent,
    HistoryTrackComponent,
    SubListItemUpdateComponent,
    SavetendersubstatusComponent,
    
    // SystemlistComponent
    // SystemlistComponent,
    // HomeFooterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
  ]
})
export class AdminModule { }
