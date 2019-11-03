import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router} from '@angular/router';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})

export class AppNavComponent implements OnInit {

  constructor(private localStorage: LocalStorage,private routes:Router) { }

  ngOnInit() {
  }

  go(x){
    // alert(x);
    let xLocal = {
      idOne : x
    }
    this.localStorage.setItem('c_a_t_e_g_o_r_y_S_e_a_r_c_h',xLocal).subscribe(
      (res)=>{
        if(res == true){
          this.routes.navigateByUrl('/',{skipLocationChange:true}).then(()=>
          this.routes.navigate(['/home'])
          
          );
        }
      }
    )
  }
}
