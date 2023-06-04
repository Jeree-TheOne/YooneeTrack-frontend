import DeskController from "@/controllers/deskController";

class WorkspaceService {
  async select(id: string): Promise<any> {
    const { data } = await DeskController.select(id);
    return data
  }

  async create(name: string) {
    return await DeskController.create(name);
  }

  async update(id: string, name: string) {
    return await DeskController.update(id, name);
  }

  async setCurrent(id: string) {
    return await DeskController.setCurrent(id);
  }

  async delete(id: string): Promise<void> {
    return await DeskController.delete(id);
  }
}

export default new WorkspaceService()