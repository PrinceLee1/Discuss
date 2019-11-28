import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public getData;value;footerDate:any;
  init = false;
  constructor(private apicall :ApicallsService, private toaster :ToastrService,private localStorage: LocalStorage,private routes :Router) { }
  
hov(){
  alert('Hovered')
}

  ngOnInit() {
    this.footerDate = new Date().getFullYear();
    this.init = true;
    this.getData = {'key':'4'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
        }else if(val['code']== "01"){
          this.toaster.error(val['info'],'Security Center')
        }
      
      });
  //   this.localStorage.getItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h').subscribe(  
  //     (res)=>{
  //       if(res){
  //         // console.log(res['idOne']);
  //         let categoryApi = {
  //           category:res['idOne'],
  //           'key': '13'
  //         }
  //         this.apicall.postData(categoryApi).subscribe(
  //           val =>{
  //             if(val['code']== "00"){
  //               this.value = val['info'];
  //               this.routes.navigate(['']);
  //               this.localStorage.removeItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h');
  //             }else if(val['code']== "01"){
  //               this.toaster.error(val['info'],'Security Center')
  //             }
  //           });
  //       }else{
  //           this.getData = {'key':'4'};
  // this.apicall.postData(this.getData).subscribe(
  //   val =>{
  //     if(val['code']== "00"){
  //       this.value = val['info'];
  //     }else if(val['code']== "01"){
  //       this.toaster.error(val['info'],'Security Center')
  //     }
    
  //   });
  //       }
  //     }
  //   )
this.init = false
  }

}
