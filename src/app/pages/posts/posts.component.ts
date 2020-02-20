import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/services/apicall.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
getData;getpost:any;
  value: any;
  getdata: any;
  cookieValue: string;
  inputs=[];
  showModal = true;
  blogId: string;
  fetch=[];
  cat: any;
  pub: any;
  arti: any;
  getinfo: { 'blogId': string; 'key': string; };
  delete: any;
  response: any;
  delId: any;
  updateId: string;
  acctInfo: { 'acctinfo': string; 'key': string; };
  check: any;
  constructor(private apicall : ApicallsService,
  private cookies : CookieService,
  private toaster:ToastrService,
  private routes : Router,
  private activedRoute:ActivatedRoute) { }
  
del(){
    if (confirm("Are you sure you want to delete this Post?") == true) {
      this.delId = this.cookies.get('blog');
      console.log(this.delId)
      this.delete = {'delId':this.delId,'key':'delblog'};
      this.apicall.postData(this.delete).subscribe(
        val =>{
          if(val['code']== "00"){
            this.toaster.success(val['info'],'Security Center');
            this.routes.navigate(['dashboard/posts']);
          }else if(val['code']== "01"){
            this.toaster.error(val['info'],'Security Center');
          }
        });
    } 
  }
  ngOnInit() {
    this.apicall.checkConnectionStatus();
    this.cookieValue = this.cookies.get('blog');
    this.getdata = {'key':'5'};
    this.apicall.postData(this.getdata).subscribe(
      val =>{
        if(val['code']== "00"){
          this.inputs = val['info'];
          // console.log(this.inputs)
        }else if(val['code']== "01"){
          this.toaster.error(val['info'],'Security Center')
        }
      });
    this.getData = {'cookie':this.cookieValue,'key':'4'};
  this.apicall.postData(this.getData).subscribe(
    val =>{
      if(val['code']== "00"){
        this.value = val['info'];
      }else if(val['code']== "01"){
        this.toaster.error(val['info'],'Security Center')
      }
       
    });
    // this.blogId = this.activedRoute.snapshot.paramMap.get('id');
    //   this.getData = {'blogId':this.blogId,'key':'6'};
    //   this.apicall.postData(this.getData).subscribe(
    //     val =>{
    //       if(val['code']== "00"){
    //         this.fetch = val['info'][0].title
    //         this.cat = val['info'][0].category
    //         console.log(this.fetch)
    //       }else if(val['code']== "01"){
    //         this.toaster.error(val['info'],'Security Center');
    //       }
    //     });

  }
checkUser(){
  this.cookieValue = this.cookies.get('blog');
  this.acctInfo = {'acctinfo':this.cookieValue,'key':''}
      this.apicall.postData(this.acctInfo).subscribe(
        mes =>{
        if(mes['code'] == '00'){
            this.check = mes['info'];
          }else if(mes['code'] == '01'){
            this.routes.navigate(['/dashboard/profile']);
            this.toaster.error('Please Update your Profile!.','Security Center');

          }
        });
 
}

  submitPost(x:NgForm){
    this.apicall.checkConnectionStatus();
          this.blogId = this.activedRoute.snapshot.paramMap.get('id');
          let blog ={
            title : x.value.title,
            category : x.value.category,
            author_id:this.cookieValue,
            key : '10'
          }
          
          this.apicall.postData(blog).subscribe(
            val =>{
              if(val['code'] == '01'){
               this.toaster.error(val['info'],'Security Center');
              }else if(val['code'] == '00'){
                // this.toaster.success(val['info'],'Security Center');
                this.routes.navigate(['dashboard/write-post',val['info']]);
              }
              
            });
   
  }
}
