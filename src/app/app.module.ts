import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TenantComponent } from './tenant/tenant.component';
import { NavComponent } from './components/nav/nav.component';
import { LandlordComponent } from './landlord/landlord.component';
import { PropertyComponent } from './property/property.component';
import { LoanComponent } from './loan/loan.component';
import { InvestmentsComponent } from './investments/investments.component';
import { SettingsComponent } from './settings/settings.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { RejectModalComponent } from './components/modal/reject-modal/reject-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { DashboardCaseComponent } from './dashboard-case/dashboard-case.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './components/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TenantComponent,
  //  NavComponent,
    LandlordComponent,
    PropertyComponent,
    LoanComponent,
    InvestmentsComponent,
    SettingsComponent,
   // UserDetailsComponent,
    //PropertyDetailsComponent,
 //   RejectModalComponent,
    DashboardCaseComponent,
    ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgbModule,
     MatTableModule,
     MatPaginatorModule,
     AppRoutingModule,
     MatTabsModule,
     MatDialogModule,
    MatSelectModule,
     MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
   OverlayModule,
   ReactiveFormsModule,
   SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
