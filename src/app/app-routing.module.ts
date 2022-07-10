import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { OrdersComponent } from './order/orders.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UpdateOrderComponent } from './order/update-order/update-order.component';
import { OngoingOrdersComponent } from './order/ongoing-orders/ongoing-orders.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { OnholdQuotationComponent } from './quotation/onhold-quotation/onhold-quotation.component';
import { PortListComponent } from './port/port-list/port-list.component';
import { AddPortComponent } from './port/add-port/add-port.component';
import { AirportListComponent } from './airport/airport-list/airport-list.component';
import { AddAirportComponent } from './airport/add-airport/add-airport.component';

const routes: Routes = [
   //Admin dashbaord
  { path:"", component:LoginComponent },
  { path:"login", component:LoginComponent },
  { path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: DashboardContentComponent}]},
  
  { path:"orders",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: OrdersComponent}]},
  { path:"ongoing-orders",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: OngoingOrdersComponent}]},
  { path:"update-order/:id", component: DashboardComponent, canActivate:[AuthGuard], children:[
    {path:"", component:UpdateOrderComponent}]},
  { path:"order-details/:id", component: DashboardComponent, canActivate:[AuthGuard], children:[
      {path:"", component:OrderDetailsComponent}]},

  { path:"onhold-quotation",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: OnholdQuotationComponent}]},

  { path:"users",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: UserListComponent}]},
  { path:"user/:id",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: UserComponent}]},

  { path:"invoice/:id",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: InvoiceComponent}]},
  { path:"invoice-list",component:DashboardComponent,canActivate:[AuthGuard] , children:[
      {path:'', component: InvoiceListComponent}]},

  { path: "port-list", component: DashboardComponent, canActivate : [AuthGuard], children: [
    {path: "", component: PortListComponent}
  ]},
  { path: "port", component: DashboardComponent, canActivate : [AuthGuard], children: [
    {path: "", component: AddPortComponent}
  ]},  
  { path: "port/:id", component: DashboardComponent, canActivate : [AuthGuard], children: [
    {path: "", component: AddPortComponent}
  ]},

  { path: "airport-list", component: DashboardComponent, canActivate : [AuthGuard], children: [
    {path: "", component: AirportListComponent}
  ]},
  { path: "airport", component: DashboardComponent, canActivate : [AuthGuard], children: [
    {path: "", component: AddAirportComponent}
  ]},
  { path: "airport/:id", component: DashboardComponent, canActivate : [AuthGuard], children: [
    {path: "", component: AddAirportComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
