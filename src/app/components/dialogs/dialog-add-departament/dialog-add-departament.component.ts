import { Component, OnInit, Inject } from '@angular/core';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';

@Component({
  selector: 'app-dialog-add-departament',
  templateUrl: './dialog-add-departament.component.html',
  styleUrls: ['./dialog-add-departament.component.scss']
})
export class DialogAddDepartamentComponent implements OnInit {

  public name: string;
  public subDivisions: SubdivisionDto[] = [];
  public departaments: DepartmentDto[] = [];
  selectedSubdivisionId: number;
  selectedDepartamentId: number = null;
  departament: DepartmentDto;
  isError: boolean = false;
  isEdit: boolean = false;
  isDepartmentChoosed: boolean = true;

  constructor(public dialogRef: MatDialogRef<DialogAddDepartamentComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private departamentService: DepartmentsService, private subdivisionService: SubdivisionsService) { }

  ngOnInit() {
    this.isEdit = this.data["isEdit"];
    if (this.isEdit) {
      this.isDepartmentChoosed = false;
    }
    this.subdivisionService.getSubdivisions().subscribe(subs => {
      this.subDivisions = subs;
    });
  }

  subDivisionChanged(value): void {
    this.selectedSubdivisionId = value;
    if (this.isEdit) {
      this.departamentService.getSubdivisionDepartments(value).subscribe(deps => {
        this.departaments = deps;
      });
    }
  }

  departamentChanged(value): void {
    this.departamentService.getDepartment(value).subscribe(dep => {
      this.name = dep.name;
    });
    this.isDepartmentChoosed = true;
    this.selectedDepartamentId = value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name && this.selectedSubdivisionId) {
      this.departament = {
        name: this.name,
        subdivisionId: this.selectedSubdivisionId,
        id: this.selectedDepartamentId
      };
      if (this.selectedDepartamentId) {
        this.departamentService.updateDepartment(this.departament);
        this.dialogRef.close();
        return;
      }
      this.departamentService.addDepartment(this.departament);
      this.dialogRef.close();
      return;
    }
    this.isError = true;
  }

}
