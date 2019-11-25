export class TaskDto {
  id: number;
  title: string;
  description: string;
  comment: string;
  deadline: Date;
  creatorId: number;
  projectId: number;
}