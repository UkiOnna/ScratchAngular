import { Component, OnInit, Inject } from '@angular/core';
import { DepartmentDto } from 'src/app/models/Dtos/department.model';
import { ProjectDto } from 'src/app/models/Dtos/project.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  public projects: ProjectDto[] = [];
  selectedDepartamentId: number;
  selectedDepartamentName: string;
  selectedSubdivisionName: string;
  selectedProjectId: number;
  project: ProjectDto;
  isError: boolean = false;
  isEdit: boolean = false;
  isProjectChoosed: boolean = true;

  constructor(public dialogRef: MatDialogRef<DialogAddProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private departamentService: DepartmentsService, private projectService: ProjectsService, private subdivisionService: SubdivisionsService) { }

  ngOnInit() {
    this.isEdit = this.data["isEdit"];
    if (this.isEdit) {
      this.isProjectChoosed = false;
      this.projectService.getProjects().subscribe(pj => {
        this.projects = pj;
      });
    }
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

  projectChanged(value): void {
    this.projectService.getProject(value).subscribe(pj => {
      this.selectedDepartamentId = pj.departmentId;
      this.departamentService.getDepartment(pj.departmentId).subscribe(dp => {
        this.selectedDepartamentName = dp.name;
      });
      this.selectedProjectId = pj.id;
      this.name = pj.title;
    });
    this.isProjectChoosed = true;
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
      if (this.selectedProjectId) {
        this.projectService.updateProject(this.project);
        this.dialogRef.close();
        return;
      }
      this.projectService.addProject(this.project);
      this.dialogRef.close();
      return;
    }
    this.isError = true;
  }

}
