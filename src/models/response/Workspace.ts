import Column from "../Column";
import Desk from "../Desk";
import Member from "../Member";
import Row from "../Row";
import Tag from "../Tag";
import TaskType from "../TaskType";

export default interface Workspace {
  id: string;
  created_at: number;
  name: string;
  desks: Desk[];
  rows: Row[];
  columns: Column[];
  tags: Tag[];
  taskTypes: TaskType[];
  members: Member[];
}