import TaskAll from "@/models/response/TaskAll"
import Task from "@/models/Task"
import axios, { AxiosResponse } from "axios"

export default class TaskController {
  static async selectOne(taskId: string): Promise<AxiosResponse<Task>> {
    return axios.get('/task/' + taskId)
  }

  static async getWall(taskId: string) {
    return await axios.get('/task/wall/' + taskId)
  }

  static async create(title: string, description = null as unknown as string, rowId: string, columnId: string, deskId: string, taskTypeId: string, tags = [] as string[], initialAssessment = 0, performerId = null as unknown as string, files: File[]): Promise<void> {
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('rowId', rowId);
    form.append('columnId', columnId);
    form.append('deskId', deskId);
    form.append('taskTypeId', taskTypeId);
    tags.forEach(tag => form.append('tags', tag))
    form.append('initialAssessment', String(initialAssessment));
    if (performerId) form.append('performerId', performerId);
    files.forEach(file => form.append('files', file));

    await axios.post('/task', form)
  }

  static async update(id: string, title: string, description = null as unknown as string, rowId: string, columnId: string, deskId: string, taskTypeId: string, tags = [] as string[], initialAssessment = 0, performerId = null as unknown as string, files: File[]): Promise<void> {
    console.log(files);
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('rowId', rowId);
    form.append('columnId', columnId);
    form.append('deskId', deskId);
    form.append('taskTypeId', taskTypeId);
    tags.forEach(tag => form.append('tags', tag))
    form.append('initialAssessment', String(initialAssessment));
    if (performerId) form.append('performerId', performerId);
    files.forEach(file => form.append('files', file));

    await axios.put('/task/' + id, form)
  }

  static async addComment(id: string, text: string): Promise<void> {
    await axios.post('/task/comment/' + id, { text })
  }

  static async addSpentTime(id: string, spentTime: number): Promise<void> {
    await axios.post('/task/spent-time/' + id, { spentTime })
  }

  static async delete(id: string): Promise<void> {
    await axios.delete('/task/' + id)
  }
}