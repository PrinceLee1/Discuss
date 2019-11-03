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
  constructor(private apicall : ApicallsService,private cookies : CookieService,private toaster:ToastrService,private routes : Router,private activedRoute:ActivatedRoute) { }

  ngOnInit() {
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
    this.getData = {'key':'4'};
  this.apicall.postData(this.getData).subscribe(
    val =>{
      if(val['code']== "00"){
        this.value = val['info'];
      }
       
    });

  }

  submitPost(x:NgForm){
    this.blogId = this.activedRoute.snapshot.paramMap.get('id');console.log(this.blogId);

    console.log(x.value);
  
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
          this.toaster.success(val['info'],'Security Center');
          this.routes.navigate(['dashboard/write-post',val['info']]);
        }
        
      });
  }
}
