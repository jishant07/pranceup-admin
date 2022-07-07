/* Angular Components/Modules */
import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Angular Material Components */
import { MaterialModule } from './material.module';

/* Self Made Components */
import { AuthGuard } from './_services/auth.guard';
import { InterceptorService } from './_services/loader/interceptor.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { CountryComponent } from './country/country.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { FileUploadComponent } from './features/file-upload/file-upload.component';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './order/orders.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UpdateOrderComponent } from './order/update-order/update-order.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PieceComponent } from './features/piece/piece.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { OngoingOrdersComponent } from './order/ongoing-orders/ongoing-orders.component';
import { OnholdQuotationComponent } from './quotation/onhold-quotation/onhold-quotation.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardContentComponent,
    CountryComponent,
    CountryListComponent,
    FileUploadComponent,
    UserComponent,
    OrdersComponent,
    UserListComponent,
    UpdateOrderComponent,
    OngoingOrdersComponent,
    InvoiceComponent,
    PieceComponent,
    OrderDetailsComponent,
    InvoiceListComponent,
    OnholdQuotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, FormsModule,
    MaterialModule
  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:InterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
