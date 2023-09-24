import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RejectModalComponent } from '../modal/reject-modal/reject-modal.component';
import { UserService } from 'src/service/user.service';
import { AuthenticationService } from 'src/service/auth.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {
   identifier = ''
   userDetails: any
      constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private authS: AuthenticationService,
        private userS: UserService
      ) {
     if (this.router.getCurrentNavigation()?.extras?.state?.user) {
      this.userDetails = this.router.getCurrentNavigation().extras?.state?.user
      }else 
        this.getUser()
      }


  ngOnInit(): void {
     this.identifier = this.route.snapshot.queryParams.user
  }
  ngAfterViewInit() {
    }

    getUser(){
     this.identifier = this.route.snapshot.queryParams.user
      this.authS.fetchUserProfile(this.identifier)
      .subscribe((r)=>{
        this.userDetails = r?.results
      },
      (er)=>{

      })
      
    }

  onBack(){
   this.router.navigate([`../`],{
     relativeTo: this.route,
     //queryParamsHandling: 'merge'
   })
  }

   get isPending():boolean{
    return this.userDetails?.is_pending || false
  }

  get isActive():boolean{
    return  this.userDetails?.is_active || false
  }

   openDialog(title: string): void {
    this.dialog.open(RejectModalComponent, {
      width: '560px',
      height:'55vh',
      data: {
        title: title,
        isProperty: false
      },
    });
  }

  approveAccount(){
      this.userS.approveUser(this.identifier)
      .subscribe({
        next:(value) =>{
         this.getUser()
        },
        error:(err) =>{
            console.log(err)
        },
      })
  }

}
