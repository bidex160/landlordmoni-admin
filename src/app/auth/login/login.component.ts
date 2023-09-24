import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })
  loading: boolean = false
    errorMessage: {message: boolean, status: boolean}
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private userS: UserService
  ) { }

  ngOnInit(): void {
      this.userS.errorSub.subscribe((r)=>{
      this.errorMessage = r
    })
  }

  onLogin(){
    this.loading = true
   this.auth.login(this.form.value)
   .subscribe({
    next:(value)=> {
     this.loading = false
       if(value.status){
             this.userS.setError({message: 'Success', status: true})
      this.router.navigate(['/dashboard/home']);
       }else{
        this.userS.setError({message: value?.message, status: false})
       }
    },
    error:(err) => {
      this.loading = false
     this.userS.setError({message: err?.message||"Error", status: false})
    },
   })
  }

}
