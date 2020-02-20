import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {
   
  private ap:string = 'http://localhost/blogfolder/blogapi.php';

  constructor(private http:HttpClient,private toaster:ToastrService) {
   }
   postData(payload){
     return this.http.post(this.ap,JSON.stringify(payload));
   }
   sendData(x){
     return this.http.post(this.ap,x).pipe(map((res)=>{
      return res
     }))
   }
   createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
  checkConnectionStatus(){
    this.createOnline$().subscribe(isOnline => {
      if(isOnline == false){
        this.toaster.error('Please Check your Internet Connection!','Security Center');
      }
    });
  }
   sendTophp(x){
    return this.http.post(this.ap,x);
   }
}
