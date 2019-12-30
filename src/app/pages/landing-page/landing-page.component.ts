import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce,fadeIn,slideInLeft} from 'ng-animate';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce, {
      // Set the duration to 7seconds and delay to 1second
      params: { timing: 7, delay: 1 }
    }))]),
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 0second
      params: { timing: 4, delay: 0 }
    }))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft, {
    }))])

  ],
})
export class LandingPageComponent implements OnInit {
  public getData;value;footerDate;fadeIn;slideInLeft;slideInRight:any;
  init = false;
  bounce: any;
  constructor(private apicall :ApicallsService, private toaster :ToastrService,private localStorage: LocalStorage,private routes :Router) { }
  
hov(){
  alert('Hovered')
}

  ngOnInit() {

         this.getData = {'key':'allpost'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
        }else if(val['code']== "01"){
          this.toaster.error(val['info'],'Security Center')
        }
      
      });
this.init = false
  }

}
