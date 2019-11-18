import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { UserLoginDto } from 'src/app/models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
  
})
export class SignInComponent implements OnInit {
  public login: string = '';
  public password: string = '';

  constructor(private router: Router, private usersService: UsersService,private cookieService : CookieService) { }

  ngOnInit() {
  }

  public signIn(){
    if(this.login && this.password){
      let user: UserLoginDto = { login: this.login, password: this.password };
    this.usersService.signIn(user).subscribe(result => this.goToProfile(result));
    }
  }

  public goToProfile(result: string) {
    if (!!result)
    {
      this.cookieService.set('token',result);
      this.router.navigate(['/main-page/']);
    }
    else
    {
      
    }
  }

}
