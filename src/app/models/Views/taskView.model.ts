import { IntervalCellViewModel } from './intervalCellView.model';

export class TaskViewModel {
  id: number;
  projectName: string;
  taskName: string;
  intervalCells: IntervalCellViewModel[];
}