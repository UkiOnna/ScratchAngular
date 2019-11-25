export class TaskDto {
  id: number;
  projectId: number;
  creatorId: number;
  title: string;
  deadline: Date;
  todayWorkTime: Date;
  allWorkTime: Date;
  taskStatus: string;
}