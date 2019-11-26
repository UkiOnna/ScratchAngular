import { Component, OnInit } from '@angular/core';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { MatDialogRef } from '@angular/material';
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
  selectedSubdivisionId: number;
  departament: DepartmentDto;
  isError: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddDepartamentComponent>, private departamentService: DepartmentsService, private subdivisionService: SubdivisionsService) { }

  ngOnInit() {
    this.subdivisionService.getSubdivisions().subscribe(subs => {
      this.subDivisions = subs;
    });
  }

  subDivisionChanged(value): void {
    this.selectedSubdivisionId = value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name && this.selectedSubdivisionId) {
      this.departament = {
        name: this.name,
        subdivisionId: this.selectedSubdivisionId,
        id: null
      };
      this.departamentService.addDepartment(this.departament);
      this.dialogRef.close();
    }
    else {
      this.isError = true;
    }
  }

}
