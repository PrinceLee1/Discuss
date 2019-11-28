import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  getData:any;
  value: any;
  cookieValue: any;
  got: any;
  getinfo: { 'get_post': any; 'key': any; };
  draft: any;
  publish: any;

  constructor(private apicall :ApicallsService,private cookies:CookieService) { }

  ngOnInit() {
    this.cookieValue = this.cookies.get('blog')
    this.getinfo = {'get_post':this.cookieValue,
    'key':'12'}
    this.apicall.postData(this.getinfo).subscribe(
      val =>{
        if(val['code']== "00"){
          this.got = val['info'];
        } if(val['code'] == "00"){
          this.draft = val['msg'];
        }if(val['code']== "00"){
          this.publish = val['response'];
        }
      });
    this.getData = {'info_of_user':this.cookieValue,
    'key':'8'};
    this.apicall.postData(this.getData).subscribe(
      val =>{
        if(val['code']== "00"){
          this.value = val['info'];
        }
      });
  }

}
