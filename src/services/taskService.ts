import TaskController from "@/controllers/taskController";
import TaskAll from "@/models/response/TaskAll";
import Task from "@/models/Task";

class TaskService {
  // async selectAll(deskId: string): Promise<TaskAll[]> {
  //   const { data } = await TaskController.selectAll(deskId)
  //   return data
  // }

  async selectOne(taskId: string): Promise<Task> {
    const { data } = await TaskController.selectOne(taskId)
    return data
  }

  async add(title: string, description = null as unknown as string, rowId: string, columnId: string, deskId: string, taskTypeId: string, tags = [] as string[], initialAssessment = 0, performer: string | undefined, files: File[]) {
    await TaskController.create(title, description, rowId, columnId, deskId, taskTypeId, tags, initialAssessment, performer, files)
  }

  async update(id: string, title: string, description = null as unknown as string, rowId: string, columnId: string, deskId: string, taskTypeId: string, tags = [] as string[], initialAssessment = 0, performerId: string | undefined, files: File[]) {
    await TaskController.update(id, title, description, rowId, columnId, deskId, taskTypeId, tags, initialAssessment, performerId, files)
  }

  async getWall(id: string) {
    const { data } = await TaskController.getWall(id)
    return data
  }
}

export default new TaskService()