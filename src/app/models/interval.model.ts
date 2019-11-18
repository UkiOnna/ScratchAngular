export class IntervalDto {
  id: number;
  start: Date;
  end: Date;
  taskId: number;
  userId: number;
}

export class IntervalCellViewModel {
  hour: number;
  isWork: boolean;
}