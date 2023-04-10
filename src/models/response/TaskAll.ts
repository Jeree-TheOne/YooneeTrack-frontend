export default interface TaskAll {
  id: string;
  title: string;
  description: string;
  performer_avatar?: string;
  performer_email?: string;
  tags: string[];
  task_type: string;
  row_id: string;
  column_id: string;
  initial_assessment?: number;
  spent_time: number;
}