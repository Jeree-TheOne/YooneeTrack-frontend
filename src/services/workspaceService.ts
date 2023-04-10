import WorkspaceController from "@/controllers/workspaceController";
import AvailableWorkspace from "@/models/response/AvailableWorkspace";
import Workspace from "@/models/response/Workspace";

class WorkspaceService {
  async availableWorkspaces(): Promise<AvailableWorkspace[]> {
    const { data } = await WorkspaceController.availableWorkspaces();
    return data
  }

  async singleWorkspace(id: string): Promise<Workspace> {
    const { data } = await WorkspaceController.singleWorkspace(id);    
    return data
  }

  async changeWorkspaceName(id: string, name: string) {
    await WorkspaceController.changeWorkspaceName(id, name)
  }
  
  async createWorkspace(name: string) {
    return await WorkspaceController.createWorkspace(name)
  }
}

export default new WorkspaceService()