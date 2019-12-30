import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApicallsService } from 'src/app/services/apicall.service';

import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})

export class AppNavComponent implements OnInit {
  cookieValue: any;
  acctInfo: { 'acctinfo': any; 'key': string; };
  value: any;
isnotLogin = true;
  constructor(private localStorage: LocalStorage,
    private apicall : ApicallsService,
  private cookies : CookieService,
  private toaster:ToastrService,
  private routes : Router,
  private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.cookieValue = this.cookies.get('blog');
    this.acctInfo = {'acctinfo':this.cookieValue,'key':'19'}
        this.apicall.postData(this.acctInfo).subscribe(
          mes =>{
            if(mes['code'] == '01'){
             this.toaster.error(mes['info'],'Security Center');
            }else if(mes['code'] == '00'){
              this.value = mes['info'];
            }
            if (this.value[0][7]){
              this.isnotLogin = false;
            }else{
              this.isnotLogin = true;
            }
          });

  }
  

}
