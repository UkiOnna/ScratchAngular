export class UserWorkOnTheTaskDto {
  id: number;
  projectId: number;
  creatorId: number;
  title: string;
  deadline: Date;
  todayWorkTime: Date;
  allWorkTime: Date;
  taskStatus: string;
}