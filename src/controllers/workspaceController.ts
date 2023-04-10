import AvailableWorkspace from "@/models/response/AvailableWorkspace"
import Workspace from "@/models/response/Workspace"
import axios, { AxiosResponse } from "axios"

export default class WorkspaceController {
  static async availableWorkspaces(): Promise<AxiosResponse<Array<AvailableWorkspace>>> {
    return axios.get<Array<AvailableWorkspace>>('/workspace')
  }

  static async singleWorkspace(id: string): Promise<AxiosResponse<Workspace>> {
    return axios.get<Workspace>('/workspace/' + id)
  }

  static async changeWorkspaceName(id: string, name: string) {
    return await axios.put('/workspace/' + id, { name })
  }

  static async createWorkspace(name: string) {
    return await axios.post('/workspace/add', { name })
  }
}