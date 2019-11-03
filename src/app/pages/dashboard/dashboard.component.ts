import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getData: any;
  value;name_on_dash: any;
show=true;
  hide: boolean;
  constructor(private toaster :ToastrService,private apicall :ApicallsService,private cookies:CookieService) { }
cookieValue;
// move(){
// $(".side-nav").toggleClass(".active")
// }
  ngOnInit() {
  this.cookieValue = this.cookies.get('blog');
    console.log(this.cookieValue);
    this.getData = {'name_on_dash':this.cookieValue,
    'key':'7'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
      
        }
      });
  }

}
