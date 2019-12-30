import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css']
})
export class DraftsComponent implements OnInit {
  getData: { 'draftscookie': any; 'key': string; };
  cookieValue: string;
  value = [];

  constructor(
  private apicall : ApicallsService,
  private cookies : CookieService,
  private toaster:ToastrService,
  private routes : Router,
  private activedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.cookieValue = this.cookies.get('blog');
    this.getData = {'draftscookie':this.cookieValue,'key':'getDrafts'};
    this.apicall.postData(this.getData).subscribe(
      res=>{
        if(res['code']== "00"){
          this.value = res['info'];
        }else if(res['code'] == "01"){
          this.toaster.error(res['info'],'Security Center')
        }
      });
  }

}
