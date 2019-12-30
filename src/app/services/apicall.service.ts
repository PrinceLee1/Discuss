import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";
import "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {
   
  private ap:string = 'https://di-scuss.000webhostapp.com/blogfolder/blogapi.php';

  constructor(private http:HttpClient) {
   }
   postData(payload){
     
     return this.http.post(this.ap,JSON.stringify(payload));
   }

   sendData(x){
     return this.http.post(this.ap,x).pipe(map((res)=>{
       
      return res
     }))
   }

   sendTophp(x){
      
    return this.http.post(this.ap,x);
   }
}
