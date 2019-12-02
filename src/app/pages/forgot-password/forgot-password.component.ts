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
  alert(this.forgotPass)
this.forgotPass = {'email':this.email,'key':'forgot'}
}
  ngOnInit() {
  }

}
