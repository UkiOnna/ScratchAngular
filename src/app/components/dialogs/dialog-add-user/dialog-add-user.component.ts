import { Component, OnInit, Inject } from '@angular/core';
import { UserDto } from 'src/app/models/Dtos/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';
import { UsersService } from 'src/app/services/users.service';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { RoleDto } from 'src/app/models/Dtos/role.model';

@Component({
  selector: 'dialogAddUser',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUser implements OnInit {
  public subDivisions: SubdivisionDto[] = [];
  public departaments: DepartmentDto[] = [];
  public roles: RoleDto[] = [];
  public users: UserDto[] = [];
  public selectedDepartamentId: number;
  public selectedDepartamentName: string;
  public selectedSubdivisionId: number;
  public selectedSubdivisionName: string;
  public selectedRoleId: number;
  public selectedRoleName: string;
  public selectedUserId: number;
  public name: string;
  public middlename: string;
  public lastname: string;
  user: UserDto;
  isError: boolean = false;
  isEdit: boolean = false;
  isUserChoosed: boolean = true;

  constructor(public dialogRef: MatDialogRef<DialogAddUser>, @Inject(MAT_DIALOG_DATA) public data: any, private departamentService: DepartmentsService, private subdivisionService: SubdivisionsService, private userService: UsersService) { }

  ngOnInit() {
    this.isEdit = this.data["isEdit"];
    if (this.isEdit) {
      this.isUserChoosed = false;
      this.userService.getUsers().subscribe(users => {
        this.users = users;
      });
    }

    this.subdivisionService.getSubdivisions().subscribe(subdivisions => {
      this.subDivisions = subdivisions;
    });
    this.userService.getRoles().subscribe(recievedRoles => {
      this.roles = recievedRoles;
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
  roleChanged(value): void {
    this.selectedRoleId = value;
  }

  userChanged(value): void {
    this.userService.getUser(value).subscribe(recievedUser => {
      this.departamentService.getDepartment(recievedUser.departmentId).subscribe(dep => {
        this.selectedDepartamentName = dep.name;
        this.selectedDepartamentId = dep.id;
        this.subdivisionService.getSubdivison(dep.subdivisionId).subscribe(sub => {
          this.selectedSubdivisionName = sub.name;
          this.selectedSubdivisionId = sub.id;
        });
      });
      this.name = recievedUser.firstName;
      this.middlename = recievedUser.middleName;
      this.lastname = recievedUser.lastName;
      this.selectedUserId = recievedUser.id;
      this.isUserChoosed = true;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name && this.lastname && this.middlename && this.selectedDepartamentId && this.selectedRoleId) {
      this.user = {
        firstName: this.name,
        lastName: this.lastname,
        middleName: this.middlename,
        departmentId: this.selectedDepartamentId,
        roleId: this.selectedRoleId,
        id: null
      };
    
    if (this.selectedUserId) {
      this.userService.updateUser(this.user);
      this.dialogRef.close();
      return;
    }
    this.userService.addUser(this.user);
    this.dialogRef.close();
    return;
  }

    this.isError = true;

  }


}
