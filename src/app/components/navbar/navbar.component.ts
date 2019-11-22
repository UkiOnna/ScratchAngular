import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { DialogAddUser } from '../dialogs/dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isAdmin: boolean = true;
  public isLogin: boolean = false;
  public isDepartment: boolean = false;
  public isDivision: boolean = false;
  constructor(private cookieService: CookieService, private userSerivce: UsersService, public dialog: MatDialog) { }

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
            this.isDepartment = true;
        }
      });
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUser, {
      height: '550px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}


