import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { DialogAddUser } from '../dialogs/dialog-add-user/dialog-add-user.component';
import { DialogAddTaskComponent } from '../dialogs/dialog-add-task/dialog-add-task.component';
import { DialogAddProjectComponent } from '../dialogs/dialog-add-project/dialog-add-project.component';
import { DialogAddDepartamentComponent } from '../dialogs/dialog-add-departament/dialog-add-departament.component';
import { DialogAddSubdivisionComponent } from '../dialogs/dialog-add-subdivision/dialog-add-subdivision.component';

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
  userId: number;
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
        this.userId = user.id;
      });
      this.isLogin = true;
    }
    else {
      this.isLogin = false;
    }
  }
  openCreateUserDialog(value): void {
    console.log(value);
    const dialogRef = this.dialog.open(DialogAddUser, {
      height: '550px',
      width: '400px',
      data:{
        isEdit:value
      }
    });
  }

  openCreateTaskDialog(value): void {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      height: '430px',
      width: '400px',
      data: {
        userId: this.userId,
        isEdit:value
      }
    });
  }

  openCreateProjectDialog(value): void {
    this.dialog.open(DialogAddProjectComponent, {
      height: '330px',
      width: '400px',
      data:{
        isEdit:value
      }
    });
  }

  openCreateDepartamentDialog(value): void {
    this.dialog.open(DialogAddDepartamentComponent, {
      height: 'auto',
      width: '400px',
      data:{
        isEdit:value
      }
    });
  }

  openCreateSubdivisionDialog(value): void {
    this.dialog.open(DialogAddSubdivisionComponent, {
      height: '200px',
      width: '400px',
      data:{
        isEdit:value
      }
    });
  }
}


