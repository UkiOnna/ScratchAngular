import { Component, OnInit } from '@angular/core';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { ProjectDto } from 'src/app/models/Dtos/project.model';
import { MatDialogRef } from '@angular/material';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent implements OnInit {

  public name: string;
  public departaments: DepartmentDto[] = [];
  public subDivisions: SubdivisionDto[] = [];
  selectedDepartamentId: number;
  project: ProjectDto;
  isError: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddProjectComponent>, private departamentService: DepartmentsService, private projectService: ProjectsService, private subdivisionService: SubdivisionsService) { }

  ngOnInit() {
    this.subdivisionService.getSubdivisions().subscribe(subs => {
      this.subDivisions = subs;
    });
  }

  subDivisionChanged(value): void {
    this.departamentService.getSubdivisionDepartments(value).subscribe(departaments => {
      this.departaments = departaments;
    });
  }

  departamentChanged(value): void {
    this.selectedDepartamentId = value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.name && this.selectedDepartamentId) {
      this.project = {
        title: this.name,
        departmentId: this.selectedDepartamentId,
        id: null
      };
      this.projectService.addProject(this.project);
      this.dialogRef.close();
    }
    else {
      this.isError = true;
    }
  }

}
