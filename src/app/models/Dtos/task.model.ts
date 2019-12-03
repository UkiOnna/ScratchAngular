export class TaskDto {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  creator_id: number;
  executor_id:number;
  project_id: number;
}