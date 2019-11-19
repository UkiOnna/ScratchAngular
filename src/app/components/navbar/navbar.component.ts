import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';
import { UserDto } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isAdmin: boolean = false;
  public isLogin: boolean = false;
  public isDepartment: boolean = false;
  public isDivision: boolean = false;
  constructor(private cookieService: CookieService, private userSerivce: UsersService) { }

  ngOnInit() {
    let cookieValue = this.cookieService.get("token");
    if (!!cookieValue) {
      this.userSerivce.getUserByToken(cookieValue).subscribe(user => {
        switch (user.roleId) {
          case 1:
            this.isAdmin = true;
            break;
          case 2:
            this.isDivision = true;
            break;
          case 3:
            this.isDepartment=true;
        }
      });
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }

}
