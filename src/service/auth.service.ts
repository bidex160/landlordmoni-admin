import { Injectable } from "@angular/core";
import { AppStorage } from "./storage.service";
import { Router } from "@angular/router";
import { HttpHeaders ,HttpClient} from '@angular/common/http';
import { Auth } from "src/models/auth";
import { BehaviorSubject, Observable, of } from "rxjs";
import { NetworkProvider } from "./network/network";
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
  export class AuthenticationService{
   private currentUserSubject: BehaviorSubject<Auth>  = new BehaviorSubject<Auth>(null);
  public currentUserOb: Observable<Auth>  = this.currentUserSubject.asObservable();
    baseUrl = environment.BASE_URL

  auth: Auth 

    constructor(
        private appStorage: AppStorage,
        private router: Router,
        private netProvider: NetworkProvider
    ){}


   public get currentUserValue(): Auth {
      return this.currentUserSubject.value || this.appStorage.getItem('userAdmin');
  }

 

   get isAuthenticated(){
    return !!this.appStorage.getItem('userAdmin')
    }

  login(data: any) {
    let url = `${this.baseUrl}/Interface/Authenticate/User`
   return this.netProvider.makePostRequest(url, '', data)
   .pipe(
     map((r:any)=>{
    // this.fetchUserProfile(r?.results?.user_identifier, r?.results?.user_credentials?.token)
      let auth: Auth = Object.assign({},{...r.results,  
        identifier: r.results.user_identifier,
        access_credentials: r?.results?.user_credentials})
      this.currentUserSubject.next(auth)
       this.auth = auth
      this.appStorage.saveItem('userAdmin', auth)
      return {status: true, message: "Success"}
     }),
    catchError((e)=>of({status: false, message: e}))
    )
  }


  fetchProperty(identifier: string): Observable<any> {
    let token = this.currentUserValue.access_credentials.token
    let url = `${this.baseUrl}/Interface/Fetch/Property/${identifier}`
   return this.netProvider.makeGetRequest(url, token)
   }

   fetchUserProfile(identifier: string, token?: string): Observable<any> {
    if(!token)token = this.currentUserValue.access_credentials.token
    let url = `${this.baseUrl}/Interface/View/UserProfile/${identifier}`
   return this.netProvider.makeGetRequest(url, token)
    // .subscribe(
    //   async (r:any)=>{
    //   let authStorage = await this.appStorage.getItem('userAdmin')
    //   let userIdentifier = authStorage?.user_identifier
    //   let auth: Auth = Object.assign({},{ ...r.results, user_identifier: userIdentifier,
    //     access_credentials: authStorage?.access_credentials, meta:  r.results.meta || this.currentUserValue?.meta  })
    //   this.auth = auth
    //   this.currentUserSubject.next(auth);
    //   this.appStorage.saveItem('userAdmin', auth)
    // },
    // (error)=>{
      
    // })
    
   
  }
  
  logout(){
      this.appStorage.removeItem('userAdmin')
       window.location.reload();
    }



  }