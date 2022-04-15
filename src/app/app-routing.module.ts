import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { CountryComponent } from './country/country.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { OrdersComponent } from './order/orders.component';
import { QuotationComponent } from './quotation/quotation.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UpdateOrderComponent } from './order/update-order/update-order.component';
import { OngoingOrdersComponent } from './order/ongoing-orders/ongoing-orders.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';

const routes: Routes = [
   //Admin dashbaord
  { path:"", component:LoginComponent },
  { path:"login", component:LoginComponent },
  { path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: DashboardContentComponent}]},

  { path:"country-list",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: CountryListComponent}]},
  { path:"country",component:DashboardComponent,canActivate:[AuthGuard] , children:[
     {path:'', component: CountryComponent}]},
  { path:"country/:id",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: CountryComponent}]},
  
  { path:"orders",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: OrdersComponent}]},
  { path:"ongoing-orders",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: OngoingOrdersComponent}]},
  { path:"update-order/:id", component: DashboardComponent, canActivate:[AuthGuard], children:[
    {path:"", component:UpdateOrderComponent}]},
  { path:"order-details/:id", component: DashboardComponent, canActivate:[AuthGuard], children:[
      {path:"", component:OrderDetailsComponent}]},

  { path:"onhold-quotation",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: QuotationComponent}]},

  { path:"users",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: UserListComponent}]},
  { path:"user/:id",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: UserComponent}]},

  { path:"invoice/:id",component:DashboardComponent,canActivate:[AuthGuard] , children:[
    {path:'', component: InvoiceComponent}]},
  { path:"invoice-list",component:DashboardComponent,canActivate:[AuthGuard] , children:[
      {path:'', component: InvoiceListComponent}]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
