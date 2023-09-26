import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TenantComponent } from './tenant/tenant.component';
import { LoanComponent } from './loan/loan.component';
import { InvestmentsComponent } from './investments/investments.component';
import { PropertyComponent } from './property/property.component';
import { LandlordComponent } from './landlord/landlord.component';
import { SettingsComponent } from './settings/settings.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { DashboardCaseComponent } from './dashboard-case/dashboard-case.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // {
  // path: '',
  // component: LoginComponent
  // },
   {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
 },

    {
        path: 'dashboard',
       canActivate: [AuthenticationGuard],
        canActivateChild: [
          AuthenticationGuard,
        ],
       component: DashboardCaseComponent,
        children: [
          {
            path: 'home',
            component: DashboardComponent,
          },
         {
         path: 'tenant',
         children: [
           {
            path: '',
           component: TenantComponent
           },
           {
            path: 'details',
           component: UserDetailsComponent
           }
         ]
         },
         {
           path: 'landlord',
            children: [
           {
            path: '',
           component: LandlordComponent
           },
           {
            path: 'details',
           component: UserDetailsComponent
           }
         ]
         },
         {
           path: 'property',
           children: [
           {
            path: '',
           component: PropertyComponent
           },
           {
            path: 'details',
           component: PropertyDetailsComponent
           }
         ]
         },
         {
           path: 'investments',
           component: InvestmentsComponent
         },
         {
           path: 'loan',
           component: LoanComponent,
         },
         {
           path: 'settings',
           component: SettingsComponent,
         },
        ],
     },

 ]

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
