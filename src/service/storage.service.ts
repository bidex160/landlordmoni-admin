import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class AppStorage{

   constructor(){

   }
   
   saveItem(key: string, value: any){
    return  localStorage.setItem(key, JSON.stringify(value));
   }

   getItem(key: string){
    let item = localStorage.getItem(key)
    return item ?  JSON.parse(item): null;
   }

   removeItem(key: string){
    return  localStorage.removeItem(key);
   }
}