import { Component, OnInit } from '@angular/core';
import { SubdivisionDto } from 'src/app/models/subdivision.model';
import { DepartmentDto } from 'src/app/models/department.model';
import { UserDto } from 'src/app/models/user.model';
import { MatDialogRef } from '@angular/material';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'dialogAddUser',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUser implements OnInit {
  public subDivisions:SubdivisionDto[]=[];
  public departaments:DepartmentDto[]=[];
  public name:string;
  public middlename:string;
  public lastname:string;
  user:UserDto;

  constructor(public dialogRef: MatDialogRef<DialogAddUser>, private departamentService: DepartmentsService, private subdivisionService: SubdivisionsService,private userService:UsersService) { }

  ngOnInit() {
    this.subdivisionService.getSubdivisions().subscribe(subdivisions => {
      this.subDivisions=subdivisions;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.user.firstName=this.name;
    this.user.lastName=this.lastname;
    this.user.middleName=this.middlename;
    //добавить id департамента и подразделения
    this.userService.updateUser(this.user);
    this.dialogRef.close();
  }
  

}
