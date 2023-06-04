export default interface WallHistory {
  id: string;
  updatedFields: string[];
  fieldsValues: string[];
  previousValues: string[];
  createdAt: Date;
  userId: string;
  type: 'history';
}