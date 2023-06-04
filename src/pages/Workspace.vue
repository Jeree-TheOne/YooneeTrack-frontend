<script lang="ts">
import Workspace from "@/models/response/Workspace";
import workspaceService from "@/services/workspaceService";
import { defineComponent } from "vue";

import VSelect from "@/components/common/VSelect.vue";
import VButton from "@/components/common/VButton.vue";
import VIcon from "@/components/common/VIcon.vue";
import VInput from "@/components/common/VInput.vue";
import TaskCardModal from "@/components/modals/TaskCard.vue";

import Desk from "@/components/custom/Desk.vue";
import StorageService from "@/services/storageService";
import Task from "@/models/Task";

export default defineComponent({
  components: {
    VSelect,
    VButton,
    VIcon,
    Desk,
    VInput,
    TaskCardModal
  },

  data() {
    return {
      workspace: null as unknown as Workspace,
      deskId: '',
      search: '',

      localTask: {} as Task,
      isTaskModalOpen: false
    }
  },

  methods: {
    async init() {
      this.workspace = await workspaceService.singleWorkspace(this.$route.params.workspace as string)
      this.deskId = this.$route.params.deskId === 'current' ? this.workspace.desks.find(desk => desk.isCurrent)?.id || '' : this.$route.params.deskId as string
      StorageService.setItem('workspace', this.workspace.id)
    },

    deskChange(deskId: string) {
      const desk = this.workspace.desks.find(desk => desk.id === deskId)?.isCurrent ? 'current' : deskId
      this.$router.replace(`/workspace/${this.workspace.id}/${desk}`)
      this.deskId = deskId
    },

    goToSetting() {
      this.$router.push('/workspace/settings/' + this.$route.params.workspace)
    },

    addTask({columnId, rowId}: {columnId: string, rowId: string} ) {
      this.toggleTaskModal()
      this.localTask.columnId = columnId
      this.localTask.rowId = rowId
    },

    openTask(taskId: string) {
      this.toggleTaskModal()
      this.localTask.id = taskId
    },

    toggleTaskModal() {
      this.isTaskModalOpen = !this.isTaskModalOpen
    },

    closeTaskModal(value: boolean) {
      this.toggleTaskModal()
      this.localTask = {} as Task
      console.log(this.isTaskModalOpen);
      if (value) this.$router.go(0)
    }
  },

  computed: {
    attrs() {
      const { columns, rows, members, tags } = this.workspace
      return {
        columns, rows, members, tags
      }
    }
  },

  created() {
    this.init()
  }
})
</script>

<template>
  <div class="workspace">
    <div class="workspace__actions-panel">
      <v-select left class="workspace__select-desk-container" @change="deskChange" v-if="workspace" :value="deskId" :items="workspace.desks" itemText="name" itemValue="id">
        <template #activator="{ attrs }">
          <v-button class="workspace__select-desk" @click="attrs.click">
            {{ workspace.desks.find(desk => desk.id == deskId)?.name }}
            <v-icon size="16" name="arrowDownIcon"/>
          </v-button>
        </template>
      </v-select>
      <v-input v-if="workspace" class="workspace__search" v-model="search"/>
      <v-button :size="36" @click="goToSetting" icon class="workspace__settings-button">
        <v-icon size="24" name="settingsIcon"/>
      </v-button>
    </div>
    <desk @addTask="addTask" @openTask="openTask" :search="search" v-if="workspace" :id="deskId" v-bind="attrs"/>
    <task-card-modal :task="localTask" :workspace="workspace" :show="isTaskModalOpen" @close="closeTaskModal"/>
 </div>
</template>

<style lang="scss" scoped>
.workspace {
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__search {
    width: 100%;
    min-width: 250px;
    max-width: 650px;
    height: 36px;
    margin-right: 72px;

    &:deep(.v-input__field) {
      background-color: $grey-300;
      border-radius: 5px;
    }
  }

  &__select-desk {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    height: 36px;
    border-radius: 5px;

    &-container {
      width: fit-content;
    }
  }

  &__actions-panel {
    display: flex;
    gap: 16px;
    justify-content: space-between;
  }

  &__settings-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 5px;

    @include set-prop-states-values(color, $grey-600, $primary-light)
  }
}
</style>
