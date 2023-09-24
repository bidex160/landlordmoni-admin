import { NgModule } from "@angular/core";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { LoaderComponent } from "./loader/loader.component";
import { RejectModalComponent } from "./modal/reject-modal/reject-modal.component";
import { NavComponent } from "./nav/nav.component";
import { PropertyDetailsComponent } from "./property-details/property-details.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "../app-routing.module";
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
   UserDetailsComponent,
   LoaderComponent,
   RejectModalComponent,
   NavComponent,
   PropertyDetailsComponent
  ],
  imports: [
    CommonModule,
    //NgbModule,
     MatTableModule,
     MatPaginatorModule,
     MatTabsModule,
     MatDialogModule,
    MatSelectModule,
     MatFormFieldModule,
    MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
   ReactiveFormsModule,
   OverlayModule
  ],
  exports: [
    UserDetailsComponent,
   LoaderComponent,
   RejectModalComponent,
   NavComponent,
   PropertyDetailsComponent
  ]
})
export class SharedModule { }
