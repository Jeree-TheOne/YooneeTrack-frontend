import File from './File'

export default interface Task {
  id: string;
  title: string;
  description: string;
  authorId: string;
  performerId?: string;
  updaterId?: string;
  tags: string[];
  files: string[];
  createdAt: number;
  updatedAt?: number;
  taskTypeId: string;
  rowId: string;
  columnId: string;
  deskId: string;
  initialAssessment?: number;
  spentTime?: number;
}