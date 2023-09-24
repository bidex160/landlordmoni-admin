import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-dashboard-case',
  templateUrl: './dashboard-case.component.html',
  styleUrls: ['./dashboard-case.component.scss']
})
export class DashboardCaseComponent implements OnInit{

   title =''
  sidebarExpanded: boolean = true;
  errorMessage: {message: boolean, status: boolean}
  constructor(
    private authService: AuthenticationService,
    private userS: UserService
  ){}
  ngOnInit(): void {
    this.userS.errorSub.subscribe((r)=>{
      this.errorMessage = r
      console.log(r)
    })
  }

  logout(){
   this.authService.logout()
  }
}
