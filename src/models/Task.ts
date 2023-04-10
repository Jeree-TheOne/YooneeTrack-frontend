import File from './File'

export default interface Task {
  id: string;
  title: string;
  description: string;
  creator: string;
  performer?: string;
  updater?: string;
  tags: string[];
  files: string[];
  created_at: number;
  updated_at?: number;
  task_type_id: string;
  row_id: string;
  column_id: string;
  desk_id: string;
  initial_assessment?: number;
  spent_time?: number;
}