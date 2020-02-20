import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { Router} from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideInRight,slideInLeft,fadeIn} from 'ng-animate';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  animations: [
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight, {
      // Set the duration to 5seconds and delay to 0second
      params: { timing: 1, delay: 0 }
    }))]),
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 0second
      params: { timing: 1, delay: 0 }
    }))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft, {
    }))])

  ],
})
export class ArticlesComponent implements OnInit {
  
  public getData;value;slideInLeft;slideInRight:any;
  public onlineOffline: boolean = navigator.onLine;
  cookieValue: any;
  getdata: { 'key': string; };
  inputs: any;
  isConnected = true;
  status = 'ONLINE';
  constructor(private apicall :ApicallsService,
     private toaster :ToastrService,
     private cookies : CookieService,
     private localStorage: LocalStorage,
     private connectionService: ConnectionService,
     private routes :Router) {}

     article = false;
     go(x){
            let xLocal = {
        idOne : x
      }
      this.localStorage.setItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h',xLocal).subscribe(
        (res)=>{
          if(res == true){
          this.localStorage.getItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h').subscribe(  
              (met)=>{
                  // console.log(res['idOne']);
                  let categoryApi = {
                    category:met['idOne'],
                    'key': '13'
                  }
                  this.apicall.postData(categoryApi).subscribe(
                    val =>{
                      if(val['code']== "00"){
                        this.value = val['info'];
                        this.routes.navigate(['/articles']);
                        this.localStorage.removeItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h');
                        // this.article = true;
                      } else if(this.value == 0 ){
                        // this.article = true;
                      }
                    });
                  });
          }
        }
      );
        }

write(){
  this.cookieValue = this.cookies.get('blog');
if(this.cookieValue){
  this.routes.navigate(['dashboard/posts']);
      }else{
        this.toaster.error('Please you need to Login to Write an Article!','Security Center');
    }
}
  ngOnInit() {
    this.apicall.checkConnectionStatus();
    this.getData = {'key':'allpost'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
        }else if(val['code']== "01"){
          this.toaster.error(val['info'],'Security Center')
        }
      
      });
    
      this.getdata = {'key':'5'};
      this.apicall.postData(this.getdata).subscribe(
        val =>{
          if(val['code']== "00"){
            this.inputs = val['info'];
          }else if(val['code']== "01"){
            this.toaster.error(val['info'],'Security Center')
          }
        });
  }

}
