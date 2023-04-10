import TaskAll from "@/models/response/TaskAll"
import Task from "@/models/Task"
import axios, { AxiosResponse } from "axios"

export default class TaskController {
  static async selectAll(deskId: string): Promise<AxiosResponse<TaskAll[]>> {
    return axios.get('/task', { params: { deskId } })
  }

  static async selectOne(taskId: string): Promise<AxiosResponse<Task>> {
    return axios.get('/task/' + taskId)
  }

  static async add(title: string, description = null as unknown as string, rowId: string, columnId: string, deskId: string, taskTypeId: string, tags = [] as string[], initialAssessment = 0, performer = null as unknown as string, files: File[]): Promise<void> {
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('rowId', rowId);
    form.append('columnId', columnId);
    form.append('deskId', deskId);
    form.append('taskTypeId', taskTypeId);
    tags.forEach(tag => form.append('tags', tag))
    form.append('initialAssessment', String(initialAssessment));
    if (performer) form.append('performer', performer);
    files.forEach(file => form.append('files', file));

    axios.post('/task/add', form)
  }

  static async update(id: string, title: string, description = null as unknown as string, rowId: string, columnId: string, deskId: string, taskTypeId: string, tags = [] as string[], initialAssessment = 0, spentTime = 0, performer = null as unknown as string, files: File[]): Promise<void> {
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('row_id', rowId);
    form.append('column_id', columnId);
    form.append('desk_id', deskId);
    form.append('task_type_id', taskTypeId);
    tags.forEach(tag => form.append('tags', tag))
    form.append('initial_assessment', String(initialAssessment));
    form.append('spent_time', String(spentTime));
    if (performer) form.append('performer', performer);
    files.forEach(file => form.append('files', file));

    axios.put('/task/update/' + id, form)
  }
}