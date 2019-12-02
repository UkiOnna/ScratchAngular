export class TaskDto {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  creatorId: number;
  executorId:number;
  projectId: number;
}