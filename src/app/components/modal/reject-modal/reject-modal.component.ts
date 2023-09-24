import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-reject-modal',
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.scss']
})
export class RejectModalComponent implements OnInit {
  title: string = ''
  reasons:any[] = ['Incomplete Document', 'Others']
  form: FormGroup = new FormGroup({
    reason_for_decline_title: new FormControl(null, Validators.required),
    more_information_for_decline: new FormControl(null, Validators.required)
  })
  isProperty: boolean = false
  identifier: string = ''
  loading: boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, isProperty:boolean},
    public dialogRef: MatDialogRef<RejectModalComponent>,
    private userService:UserService,
    private route: ActivatedRoute
  ) { 
    this.title = data?.title||''
    this.isProperty = data?.isProperty
  }

  ngOnInit(): void {
     this.identifier = this.route.snapshot.queryParams?.user || this.route.snapshot.queryParams?.property
  }

  submit(){
    this.loading = true
    if(this.isProperty)
    this.userService.declineProperty(this.identifier, this.form.value)
  .subscribe({
    next:(value) => {
      this.loading = false
      this.userService.setError({message: 'Property approved successfully', status: true})
      this.dialogRef.close(value)

    },
    error:(err) =>{
      this.userService.setError({message: err, status: false})
      this.loading = false
    },
  })
  else
   this.userService.declineUser(this.identifier,  this.form.value)
  .subscribe({
    next:(value) => {
       this.loading = false
      this.userService.setError({message: 'User approved successfully', status: true})
      this.dialogRef.close(value)
    },
    error:(err) =>{
       this.userService.setError({message: err, status: false})
      this.loading = false
    },
  })
  }

}
