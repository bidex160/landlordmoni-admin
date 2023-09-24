
import { Injectable } from '@angular/core';
import { Auth } from 'src/models/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkProvider {

  constructor ( private http: HttpClient) {}


  makePostRequest(url: string,  token: string, data?: any){
    var header = {
    headers: new HttpHeaders()
    .set('Authorization',  `Bearer ${token}`)
     }
   return this.http.post(url, data, header)
   .pipe(map((r:any)=> {
            if(r.status_code == 200 ||  r.status_code == 200)
            return r
           else {
            let err = r?.results?.errors?.length ? r?.results?.errors[0]?.message : r?.message
            throw  err
          }
          } ))
  }

  makeGetRequest(url: string, token: string, params?: any){
    
  var header = {
    headers: new HttpHeaders()
    .set('Authorization',  `Bearer ${token}`)
     }
   return this.http.get(url, header)
   .pipe(map((r:any)=> {
            if(r.status_code == 200 ||  r.status_code == 200)
            return r
           else {
            let err = r?.results?.errors?.length ? r?.results?.errors[0]?.message : r?.message
            throw  err
          }
          } ))
  }

  makePatchRequest(url: string,  token: string, data?: any){
    
  var header = {
    headers: new HttpHeaders()
    .set('Authorization',  `Bearer ${token}`)
     }
   return this.http.patch(url, data, header)
   .pipe(map((r:any)=> {
            if(r.status_code == 200 ||  r.status_code == 200)
            return r
           else {
            let err = r?.results?.errors?.length ? r?.results?.errors[0]?.message : r?.message
            throw  err
          }
          } ))
  }

  makePutRequest(url: string,  token: string, data?: any){
    
  var header = {
    headers: new HttpHeaders()
    .set('Authorization',  `Bearer ${token}`)
     }
   return this.http.put(url, data, header)
   .pipe(map((r:any)=> {
            if(r.status_code == 200 ||  r.status_code == 200)
            return r
          else {
            let err = r?.results?.errors?.length ? r?.results?.errors[0]?.message : r?.message
            throw  err
          }
          } ))
  }

  makeDeleteRequest(url: string, token: string, params?: any){
    
  var header = {
    headers: new HttpHeaders()
    .set('Authorization',  `Bearer ${token}`)
     }
   return this.http.delete(url,  header)
          .pipe(map((r:any)=> {
            if(r.status_code == 200 ||  r.status_code == 200)
            return r
          else {
            let err = r?.results?.errors?.length ? r?.results?.errors[0]?.message : r?.message
            throw  err
          }
          } ))
  }

}







