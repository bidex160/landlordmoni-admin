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
  export class UserService{
    baseUrl = environment.BASE_URL

     auth: Auth 

     errorSub: BehaviorSubject<any> = new BehaviorSubject<any>(null)

    constructor(
        private appStorage: AppStorage,
        private netProvider: NetworkProvider
    ){
        this.auth = appStorage.getItem('userAdmin')
    }

  setError(err: {message: string, status: boolean}){
   this.auth = this.appStorage.getItem('userAdmin')
    this.errorSub.next(err)
    setTimeout(()=>{
       this.errorSub.next(null)
    }, 1800)
  }

  fetchLandlordList(currentPage: number = 1, perPage: number = 10, active: string = 'All'): Observable<any> {
    let url = `${this.baseUrl}/Interface/Fetch/LandlordList/${active}?sortBy=asc&page=${currentPage}&perPage=${perPage}`
    return this.netProvider.makeGetRequest(url, this.auth.access_credentials.token)   
  }

   fetchTenantList(currentPage: number = 1, perPage: number = 10, active: string = 'All'): Observable<any> {
    let url = `${this.baseUrl}/Interface/Fetch/TenantList/${active}?sortBy=asc&page=${currentPage}&perPage=${perPage}`
    return this.netProvider.makeGetRequest(url, this.auth.access_credentials.token)   
   }

   fetchPropertyList(currentPage: number = 1, perPage: number = 10, active: string = 'All'): Observable<any> {
    let url = `${this.baseUrl}/Interface/Fetch/PropertyList/${active}?sortBy=asc&page=${currentPage}&perPage=${perPage}`
    return this.netProvider.makeGetRequest(url, this.auth.access_credentials.token)   
   }

   fetchUserMetrics(): Observable<any> {
    let url = `${this.baseUrl}/Interface/Fetch/UserMetrics`
    return this.netProvider.makeGetRequest(url, this.auth.access_credentials.token)   
   }

    approveUser(id: string): Observable<any> {
    let url = `${this.baseUrl}/Interface/Approve/User/${id}`
    return this.netProvider.makePutRequest(url, this.auth.access_credentials.token)   
   }

    approveProperty(id: string): Observable<any> {
    let url = `${this.baseUrl}/Interface/Approve/Property/${id}`
    return this.netProvider.makePutRequest(url, this.auth.access_credentials.token)   
   }

    declineUser(id: string, body: any): Observable<any> {
    let url = `${this.baseUrl}/Interface/Decline/User/${id}`
    return this.netProvider.makePutRequest(url, this.auth.access_credentials.token, body)   
   }

  declineProperty(id: string, body: any): Observable<any> {
    let url = `${this.baseUrl}/Interface/Decline/Property/${id}`
    return this.netProvider.makePutRequest(url, this.auth.access_credentials.token, body)   
   }
  

  }