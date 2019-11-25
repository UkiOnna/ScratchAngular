import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/Dtos/user.model';
import { MatDialogRef } from '@angular/material';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';
import { UsersService } from 'src/app/services/users.service';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';

@Component({
  selector: 'dialogAddUser',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUser implements OnInit {
  public subDivisions: SubdivisionDto[] = [];
  public departaments: DepartmentDto[] = [];
  public selectedDepartamentId: number;
  public selectedSubdivisionId: number;
  public name: string;
  public middlename: string;
  public lastname: string;
  user: UserDto;
  isError:boolean=false;

  constructor(public dialogRef: MatDialogRef<DialogAddUser>, private departamentService: DepartmentsService, private subdivisionService: SubdivisionsService, private userService: UsersService) { }

  ngOnInit() {
    this.subdivisionService.getSubdivisions().subscribe(subdivisions => {
      this.subDivisions = subdivisions;
    });
  }

  subDivisionChanged(value): void {
    this.departamentService.getSubdivisionDepartments(value).subscribe(departaments => {
      this.departaments = departaments;
    });
    this.selectedSubdivisionId = value;
  }

  departamentChanged(value): void {
    this.selectedDepartamentId = value;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name && this.lastname && this.middlename && this.selectedDepartamentId) {
      this.user.firstName = this.name;
      this.user.lastName = this.lastname;
      this.user.middleName = this.middlename;
      this.user.departmentId = this.selectedDepartamentId;
      this.userService.updateUser(this.user);
      this.dialogRef.close();
    }
    else{
      this.isError=true;
    }
  }


}
