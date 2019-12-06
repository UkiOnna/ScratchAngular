import { Component, OnInit, Inject } from '@angular/core';
import { SubdivisionDto } from 'src/app/models/Dtos/subdivision.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubdivisionsService } from 'src/app/services/subdivisions.service';

@Component({
  selector: 'app-dialog-add-subdivision',
  templateUrl: './dialog-add-subdivision.component.html',
  styleUrls: ['./dialog-add-subdivision.component.scss']
})
export class DialogAddSubdivisionComponent implements OnInit {

  public name: string;
  subdivisions: SubdivisionDto[] = [];
  subdivision: SubdivisionDto;
  isError: boolean = false;
  isEdit: boolean = false;
  isSubdivisionChoosed: boolean = true;
  selectedSubdivisionId: number = 0;
  isDeleted: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddSubdivisionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private subdivisionService: SubdivisionsService) { }

  ngOnInit() {
    this.isEdit = this.data["isEdit"];
    this.isDeleted = this.data["isDeleted"];
    if (this.isEdit || this.isDeleted) {
      this.isSubdivisionChoosed = false;
      this.subdivisionService.getSubdivisions().subscribe(subs => {
        this.subdivisions = subs;
      });
    }
  }

  subDivisionChanged(value): void {
    this.selectedSubdivisionId = value;
    this.subdivisionService.getSubdivison(value).subscribe(subs => {
      this.selectedSubdivisionId = subs.id;
      this.name=subs.name;
    });
    this.isSubdivisionChoosed = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    if (this.selectedSubdivisionId!=0 && this.isDeleted) {
      this.subdivisionService.deleteSubdivision(this.selectedSubdivisionId).subscribe();
      this.dialogRef.close();
      return;
    }
    if (this.name) {
      this.subdivision = {
        name: this.name,
        id: this.selectedSubdivisionId
      };
      if (this.selectedSubdivisionId!=0) {
        this.subdivisionService.updateSubdivision(this.subdivision).subscribe();
        this.dialogRef.close();
        return;
      }
      console.log("sfd");
      this.subdivisionService.addSubdivision(this.subdivision).subscribe();
      this.dialogRef.close();
      return;
    }
    this.isError = true;
  }

}
