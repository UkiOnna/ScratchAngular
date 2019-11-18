import { IntervalCellViewModel } from './interval.model';

export class TaskDto {
  id: number;
  title: string;
  description: string;
  comment: string;
  creatorId: number;
  projectId: number;
}

export class TaskViewModel {
  id: number;
  projectName: string;
  taskName: string;
  intervalCells: IntervalCellViewModel[];
}