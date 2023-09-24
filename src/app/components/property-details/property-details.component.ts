import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';
import { RejectModalComponent } from '../modal/reject-modal/reject-modal.component';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
type = 'Landlord'
propertyDetails:any
identifier: string
 constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private authS: AuthenticationService,
        private userS: UserService
      ) {
     if (this.router.getCurrentNavigation()?.extras?.state?.property) {
      this.propertyDetails = this.router.getCurrentNavigation().extras?.state?.property
      }else 
        this.getProperty()
      }


  ngOnInit(): void {
    this.identifier = this.route.snapshot.queryParams.property

  }

  getProperty(){
     this.identifier = this.route.snapshot.queryParams.property
      this.authS.fetchProperty(this.identifier)
      .subscribe((r)=>{
        this.propertyDetails = r?.results
      },
      (er)=>{

      })
  }

  onBack(){
   this.router.navigate([`../`],{
     relativeTo: this.route,
   })
  }


    getStatus(): string{

    if(this.propertyDetails?.property_approved) return 'Active'
    if(this.propertyDetails?.property_declined) return 'Rejected'
    else return 'Pending'
  }

  getFirstAndLast(){
    if(!this.propertyDetails)return ''
    else return `${this.propertyDetails.property_host.full_name.split(" ")[0][0]} ${this.propertyDetails.property_host.full_name.split(" ")[1][0]}`
  }

   get isDeclined():boolean{
    return this.propertyDetails?.property_declined || false
  }

  get isApproved():boolean{
    return  this.propertyDetails?.property_approved || false
  }

   openDialog(title: string): void {
    this.dialog.open(RejectModalComponent, {
      width: '560px',
      height:'55vh',
      data: {
        title: title,
        isProperty: true
      },
    });
  }

  approveAccount(){
      this.userS.approveProperty(this.identifier)
      .subscribe({
        next:(value) =>{
         this.getProperty()
        },
        error:(err) =>{
            console.log(err)
        },
      })
  }
}
