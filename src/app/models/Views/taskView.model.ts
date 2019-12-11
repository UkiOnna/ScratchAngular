import { IntervalCellViewModel } from './intervalCellView.model';

export class TaskViewModel {
  id: number;
  projectName: string;
  taskName: string;
  deadline: Date;
  intervalCells: IntervalCellViewModel[];
}