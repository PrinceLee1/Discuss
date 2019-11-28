import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public getData;value:any;
  constructor(private apicall :ApicallsService,
     private toaster :ToastrService,
     private localStorage: LocalStorage,
     private routes :Router) { }

     go(x){
      // alert(x);
      let xLocal = {
        idOne : x
      }
      this.localStorage.setItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h',xLocal).subscribe(
        (res)=>{
          if(res == true){
            this.routes.navigateByUrl('/',{skipLocationChange:true}).then(()=>
            this.routes.navigate(['/articles'])
            
            );
          }
        }
      );
      //   this.localStorage.getItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h').subscribe(  
      // (res)=>{
      //     // console.log(res['idOne']);
      //     let categoryApi = {
      //       category:res['idOne'],
      //       'key': '13'
      //     }
      //     this.apicall.postData(categoryApi).subscribe(
      //       val =>{
      //         if(val['code']== "00"){
      //           this.value = val['info'];
      //           this.routes.navigate(['']);
      //           this.localStorage.removeItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h');
      //         }else if(val['code']== "01"){
      //           this.toaster.error(val['info'],'Security Center')
      //         }
      //       });
      //     }
        }

  ngOnInit() {
    this.getData = {'key':'allpost'};
    console.log(this.getData)
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
        }else if(val['code']== "01"){
          this.toaster.error(val['info'],'Security Center')
        }
      
      });

  }

}
