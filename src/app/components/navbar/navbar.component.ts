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
        switch (user.role_id) {
          case 4:
            this.isAdmin = true;
            break;
          case 3:
            this.isDivision = true;
            break;
          case 2:
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
  openCreateUserDialog(value,isDeleted): void {
    console.log(value);
    const dialogRef = this.dialog.open(DialogAddUser, {
      height: 'auto',
      width: '400px',
      data:{
        isEdit:value,
        isDeleted:isDeleted
      }
    });
  }

  openCreateTaskDialog(value,isDeleted): void {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      height: 'auto',
      width: '400px',
      data: {
        userId: this.userId,
        isEdit:value,
        isDeleted:isDeleted
      }
    });
  }

  openCreateProjectDialog(value,isDeleted): void {
    this.dialog.open(DialogAddProjectComponent, {
      height: 'auto',
      width: '400px',
      data:{
        isEdit:value,
        isDeleted:isDeleted
      }
    });
  }

  openCreateDepartamentDialog(value,isDeleted): void {
    this.dialog.open(DialogAddDepartamentComponent, {
      height: 'auto',
      width: '400px',
      data:{
        isEdit:value,
        isDeleted:isDeleted
      }
    });
  }

  openCreateSubdivisionDialog(value,isDeleted): void {
    this.dialog.open(DialogAddSubdivisionComponent, {
      height: 'auto',
      width: '400px',
      data:{
        isEdit:value,
        isDeleted:isDeleted
      }
    });
  }
}


