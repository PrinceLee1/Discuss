import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService} from 'ngx-cookie-service';
import { Router} from '@angular/router';

declare let $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getData: any;
  value;name_on_dash: any;
load= false;
  hide: boolean;
  gt: string;
  acctInfo: { 'acctinfo': any; 'key': string; };
  welcome: any;
  constructor(private toaster :ToastrService,
    private apicall :ApicallsService,
    private cookies:CookieService,
    private routes:Router
    
    ) { }
cookieValue;
move(){
  $(".sidenav").toggleClass("toggle");
  $(".our-nav").toggleClass("expandnav");
  $(".sidenav").toggleClass("active");
  $(".main-content").toggleClass("togglemain")
}
logOut(){
this.gt = this.cookies.get('blog');
if(this.gt){
  this.cookies.deleteAll();
  this.routes.navigate(['/articles']);
      }
  }
  checkCookie(){
    if(this.cookies.get('blog')){
      return true;
    }else{
      this.routes.navigate(['/login']);
      this.toaster.error('Please Login to Continue!','Security Center');
    }
  }
  ngOnInit() {
    this.apicall.checkConnectionStatus();
    if(this.cookies.get('blog')){
       this.load = true
  this.cookieValue = this.cookies.get('blog');
    this.getData = {'name_on_dash':this.cookieValue,
    'key':'7'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
      this.load = false
        }
      });
    }else{
      this.routes.navigate(['/login']);
      this.toaster.error('Please Login to Continue!','Security Center');

    }
    this.cookieValue = this.cookies.get('blog');
    this.acctInfo = {'acctinfo':this.cookieValue,'key':'19'}
        this.apicall.postData(this.acctInfo).subscribe(
          mes =>{
            if(mes['code'] == '01'){
             this.toaster.error(mes['info'],'Security Center');
            }else if(mes['code'] == '00'){
              this.welcome = mes['info'];
            }
            
          });
  }

}
