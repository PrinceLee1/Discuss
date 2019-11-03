import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CookieserviceService {

  constructor(private routes:Router, private cookies: CookieService) { }
  managecookies(xa){
    if(xa==1){
    let datenow=JSON.stringify(Date.now());
    let jwtchk=this.cookies.get('blog1');
    let jwtself=this.cookies.get('blog');
    //('hi');
    if(jwtchk && jwtself !=''){
      //console.log('hi');
      console.log(jwtchk);
      if(datenow > jwtchk){
        this.routes.navigate(['/login']);
      }else{

        return jwtself
      }

    }

    else{this.routes.navigate(['/login'])}

  }
}
}
