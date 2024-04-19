import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { TendersGetComponent } from './tenders-grid/tenders-get/tenders-get.component';
import { TenderCreateComponent } from './tenders-grid/tender-create/tender-create.component';
import { TenderUpdateComponent } from './tenders-grid/tender-update/tender-update.component';
import { authGuard } from '../auth/auth.guard';
import { UserDepartmentComponent } from './settings/user-department/user-department.component';
import { HomeSidenavComponent } from './home-sidenav/home-sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeGetComponent } from './Employee-grid/employee-get/employee-get.component';
import { EmployeeCreateComponent } from './Employee-grid/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './Employee-grid/employee-update/employee-update.component';
import { LiveTendersComponent } from './tenders-grid/live-tenders/live-tenders.component';
import { SystemlistComponent } from './settings/systemlist/systemlist.component';
import { UserDeptCreateComponent } from './settings/user-dept-create/user-dept-create.component';
import { UserDeptUpdateComponent } from './settings/user-dept-update/user-dept-update.component';
import { DashboardAwardedTendersGetComponent } from './tenders-grid/dashboard-awarded-tenders-get/dashboard-awarded-tenders-get.component';
import { DashboardAllTendersGetComponent } from './tenders-grid/dashboard-all-tenders-get/dashboard-all-tenders-get.component';
import { DashboardthemeComponent } from './dashboardtheme/dashboardtheme.component';
import { TransactionDetailsViewComponent } from './tenders-grid/transaction-details-view/transaction-details-view.component';
import { DashboardNotawardedTendersGetComponent } from './tenders-grid/dashboard-notawarded-tenders-get/dashboard-notawarded-tenders-get.component';
import { DashboardParticipatedTendersGetComponent } from './tenders-grid/dashboard-participated-tenders-get/dashboard-participated-tenders-get.component';
import { DashboardGraphGetTendersComponent } from './tenders-grid/dashboard-graph-get-tenders/dashboard-graph-get-tenders.component';

const routes: Routes = [

  {
    path: "",
    component: HomeSidenavComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },

      { path: 'employee-get', component: EmployeeGetComponent },
      { path: 'employee-create', component: EmployeeCreateComponent },
      { path: 'employee-update', component: EmployeeUpdateComponent },

      { path: 'user-dept', component: UserDepartmentComponent },
      { path: 'userdept-create', component: UserDeptCreateComponent },
      { path: 'user-dept-update', component: UserDeptUpdateComponent },

      { path: 'tender-get', component: TendersGetComponent },
      { path: 'tender-create', component: TenderCreateComponent },
      { path: 'tender-update', component: TenderUpdateComponent },
      { path: 'live-tenders', component: LiveTendersComponent },
      
      {path:'systemlist',component:SystemlistComponent},

      {path:'dashboard-awardedtenders',component:DashboardAwardedTendersGetComponent},
      {path:'dashboard-alltenders',component:DashboardAllTendersGetComponent},
      {path:'dashboard-notawardedtenders',component:DashboardNotawardedTendersGetComponent},
      {path:'dashboard-participatedtenders',component:DashboardParticipatedTendersGetComponent},
      {path:'dashboard-graphtenders',component:DashboardGraphGetTendersComponent},
      {path:'dashboard2',component:DashboardthemeComponent},
      {path:'transactiondetailsView',component:TransactionDetailsViewComponent}

      

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
