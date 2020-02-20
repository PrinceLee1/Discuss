import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
public email;forgotPass:any;
  constructor(private apicall :ApicallsService, 
    private routes:Router,
    private toaster :ToastrService,) { }
forgot(){
this.forgotPass = {'email':this.email,'key':'forgot'}
 
this.apicall.postData(this.forgotPass).subscribe(
  (val) =>{
    if(val['code'] == '01'){
     this.toaster.error(val['info'],'Security Center');
    }else if(val['code'] == '00'){
      this.toaster.success(val['info'],'Security Center');

    }
    
  });
}
  ngOnInit() {
    this.apicall.checkConnectionStatus();
  }

}
