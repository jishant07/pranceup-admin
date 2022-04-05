import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_services/auth.guard';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { CountryComponent } from './country/country.component';
import { CountryListComponent } from './country/country-list/country-list.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
