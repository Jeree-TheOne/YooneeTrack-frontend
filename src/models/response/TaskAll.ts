export default interface TaskAll {
  id: string;
  title: string;
  description: string;
  performerId?: string;
  tags: string[];
  taskType: string;
  rowId: string;
  columnId: string;
  initialAssessment?: number;
  spentTime: number;
}