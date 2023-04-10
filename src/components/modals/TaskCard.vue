<script lang="ts">
import { defineComponent, PropType } from "vue";

import VModal from "../common/VModal.vue";
import VInput from "../common/VInput.vue";
import VTextarea from "../common/VTextarea.vue";
import VButton from "../common/VButton.vue";
import VSelect from "../common/VSelect.vue";
import VIcon from "../common/VIcon.vue";
import VDropFile from "../common/VDropFile.vue";

import Task from "@/models/Task";
import Workspace from "@/models/response/Workspace";
import taskService from "@/services/taskService";

import Multiselect from '@vueform/multiselect'
import { fromNumberToTime, fromTimeToNumber, isTimeValid, capitalizeFirstLetter } from "@/utils/formatters";



export default defineComponent({
  components: {
    VModal,
    VInput,
    VButton,
    VTextarea,
    VSelect,
    VIcon,
    Multiselect,
    VDropFile
  },

  props: {
    task: { type: Object as PropType<Task>, default: {}},
    workspace: { type: Object as PropType<Workspace>, default: {}},
  },

  data() {
    return {
      localTask: null as unknown as Task,

      isAdd: null as unknown as Boolean,
      isEdit: false,

      files: [] as File[]
    }
  },

  methods: {
    async save() {
      if (this.isAdd) {
        const { title, description, row_id, column_id, task_type_id, tags, initial_assessment, performer  } = this.localTask
        const deskId = this.$route.params.deskId === 'current' ? this.workspace.desks.find(desk => desk.is_current)?.id || '' : this.$route.params.deskId as string
        await taskService.add(title, description, row_id, column_id, deskId as string, task_type_id, tags, initial_assessment, performer, this.files)
        this.$emit('close', true)
      }

      else {
        const { id, title, description, row_id, column_id, task_type_id, tags, initial_assessment, spent_time,  performer } = this.localTask
        const deskId = this.$route.params.deskId === 'current' ? this.workspace.desks.find(desk => desk.is_current)?.id || '' : this.$route.params.deskId as string
        await taskService.update(id, title, description, row_id, column_id, deskId, task_type_id, tags, initial_assessment, spent_time, performer, this.files)
      }
    this.$emit('close', true)
    },

    edit() {
      this.isEdit = !this.isEdit
    },

    closeModal() {
      this.localTask = {} as Task;
      this.isAdd = null as unknown as Boolean
      this.isEdit = false
    },

    rowChange(row: string) {
      this.localTask.row_id = row
    },

    columnChange(column: string) {
      this.localTask.column_id = column
    },

    taskTypeChange(taskType: string) {
      this.localTask.task_type_id = taskType
    },

    performerChange(performer: string) {
      this.localTask.performer = performer
    },

    changeFiles(files: File[]) {
      this.files = files
    },
    updateAssessment(value: string) {
      console.log(fromTimeToNumber(value));
      this.localTask.initial_assessment = fromTimeToNumber(value)
    },

    updateSpent(value: string) {
      this.localTask.spent_time = fromTimeToNumber(value)
    },

    fileHref(path: string) {
      return import.meta.env.VITE_API_URL + path
    },

    fromNumberToTime,
    capitalizeFirstLetter
  },

  computed: {
    saveText() {
      if (this.isAdd) return 'Добавить'
      return 'Сохранить'
    }
  },

  watch: {
    task: {
      async handler() {
        this.localTask = this.task
        if (Object.entries(this.localTask).length && this.isAdd === null) {
          this.isAdd = !this.localTask.id
          if (!this.isAdd) {
            this.localTask = await taskService.selectOne(this.localTask.id)
          }
          else this.localTask.task_type_id = this.workspace.taskTypes[0].id
        }
      },
      deep: true,
      immediate: true,
    },
  },
})
</script>

<template>
  <v-modal @close="closeModal" fullscreen v-bind="$attrs">
    <div class="task-card-modal">
      <div class="task-card-modal__body">
        <div v-if="isAdd || isEdit" class="task-card-modal__add-edit-fields">
          <v-input v-model="localTask.title" placeholder="Заголовок" class="task-card-modal__input"/>
          <v-textarea rows="7" v-model="localTask.description" placeholder="Описание" class="task-card-modal__input"/>
          <v-drop-file @change-files="changeFiles"/>
        </div>
        <div v-else>
          <div class="task-card-modal__title">{{ capitalizeFirstLetter(localTask.title || '') }}</div>
          <div class="task-card-modal__descriptions">{{ capitalizeFirstLetter(localTask.description || 'Нет описания') }}</div>
          <hr class="task-card-modal__divider-horizontal"/>
          Файлы:
          <div class="task-card-modal__files">
            <v-button class="task-card-modal__file" target="_blank" v-for="file, index in localTask.files" :href="fileHref(file)">Файл {{ index + 1 }}</v-button>
          </div>
        </div>
        <div class="task-card-modal__body-bottom">
          <v-button class="task-card-modal__create" @click="save">{{ saveText }}</v-button>
          <v-input v-if="!isAdd" class="task-card-modal__spent-time" placeholder="Потрачено времени" @update:modelValue="updateSpent" :modelValue="fromNumberToTime(localTask.spent_time || 0)"/>
        </div>
      </div>
      <hr class="task-card-modal__divider">
      <div class="task-card-modal__sidebar">
        <v-select class="task-card-modal__select-container" @change="taskTypeChange" :value="task.task_type_id" :items="workspace.taskTypes" itemText="name" itemValue="id" placeholder="Тип задачи">
          <template #activator="{ attrs }">
            <v-button class="task-card-modal__select" @click="attrs.click">
              {{ workspace.taskTypes.find(taskType => taskType.id === localTask.task_type_id)?.name }}
              <v-icon class="task-card-modal__select-icon" size="16" name="arrowDownIcon"/>
            </v-button>
          </template>
        </v-select>
        <v-select class="task-card-modal__select-container" @change="rowChange" :value="localTask.row_id" :items="workspace.rows" itemText="name" itemValue="id" placeholder="Категория">
          <template #activator="{ attrs }">
            <v-button class="task-card-modal__select" @click="attrs.click">
              {{ workspace.rows.find(row => row.id === localTask.row_id)?.name }}
              <v-icon class="task-card-modal__select-icon" size="16" name="arrowDownIcon"/>
            </v-button>
          </template>
        </v-select>
        <v-select class="task-card-modal__select-container" @change="columnChange" :value="localTask.column_id" :items="workspace.columns" itemText="name" itemValue="id" placeholder="Статус">
          <template #activator="{ attrs }">
            <v-button class="task-card-modal__select" @click="attrs.click">
              {{ workspace.columns.find(column => column.id === localTask.column_id)?.name }}
              <v-icon class="task-card-modal__select-icon" size="16" name="arrowDownIcon"/>
            </v-button>
          </template>
        </v-select>
        <v-select class="task-card-modal__select-container" @change="performerChange" :value="localTask.performer" :items="workspace.members" itemText="email" itemValue="id" placeholder="Исполнитель">
          <template #activator="{ attrs }">
            <v-button class="task-card-modal__select" @click="attrs.click">
              <div class="task-card-modal__performer">
                {{ workspace.members.find(member => member.id === localTask.performer)?.email }}
              </div>
              <v-icon class="task-card-modal__select-icon" size="16" name="arrowDownIcon"/>
            </v-button>
          </template>
        </v-select>
        <div>
          Тэги
          <multiselect v-if="localTask.tags !== null" :value="localTask.tags" value-prop="id" v-model="localTask.tags" :options="workspace.tags" mode="multiple">
          <template #multiplelabel="{ values }">
            <div class="multiselect-multiple-label">
              Выбранных тэгов: {{ values.length }}
            </div>
          </template>
          <template v-if="localTask.tags?.length" #clear="{ clear }">
            <v-button size="16" class="task-card-modal__multiselect-icon" @click="clear"  icon>
              <v-icon size="16" name="crossIcon"/>
            </v-button>
          </template>
          <template v-else #caret>
            <v-icon class="task-card-modal__select-icon task-card-modal__multiselect-icon" size="16" name="arrowDownIcon"/>
          </template>
          <template #option="{ option, isPointed, isSelected, search }">
            <v-button class="task-card-modal__multiselect-option">{{ option.name }}</v-button>
          </template>
        </multiselect>
        </div>
        <v-input class="task-card-modal__initial-assessment" placeholder="Оценка задачи по времени" @update:modelValue="updateAssessment" :modelValue="fromNumberToTime(localTask.initial_assessment || 0)"/>
        <v-button v-if="!isAdd" class="task-card-modal__edit" @click="edit">{{ isEdit ? 'Отменить' : 'Редактировать' }}</v-button>
      </div>
    </div>
  </v-modal>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
.multiselect {
  border: none;
  background: none;

  &-multiple-label {
    padding: 0 18px;
  }

  &-wrapper {
    background-color: $grey-300;
    border-radius: 5px;
    padding-left: 4px;
  }

  &.is-active {
    border: none;
    box-shadow: none;
  }

  &-caret {
    display: none;
  }

  &-dropdown {
    background: none;
    border: none;

    overflow-y: auto
  }

  &-option {
    padding: 0;
    background-color: $grey-400;

    &.is-pointed {
      background: $grey-400;
      color: $white;
    }
  }
}
</style>

<style lang="scss" scoped>
.task-card-modal {
  padding: 20px;
  width: 800px;
  height: 100%;

  display: flex;
  gap: 16px;

  &__body {
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 16px;

    &-bottom {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
    }
  }

  &__files {
    display: flex;
    gap: 8px;

    margin-top: 12px;
  }

  &__title {
    font-size: 46px;
    margin-bottom: 16px;
  }

  &__descriptions {
    margin-bottom: 32px;
  } 

  &__file {
    background-color: $grey-200;
    padding: 8px 16px;
    border-radius: 5px;
    border: 2px dashed $accent
  }

  &__add-edit-fields {
    display: flex;
    flex-direction: column;

    gap: 16px;
  }

  &__create,
  &__edit {
    margin-top: auto;
    height: fit-content;
  }

  &__sidebar {
    width: 200px;

    display: flex;
    flex-direction: column;

    gap: 8px;
  }

  &__divider {
    border: none;

    border-left: 1px solid;
    border-color: $grey-300;

    &-horizontal {
      padding: 8px;
      border: none;
      border-top: 1px solid;
      border-color: $grey-300;
    }
  }

  &__select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    height: 36px;
    border-radius: 5px;

    &-container {
      width: fit-content;

      &:deep(.v-select__option) {
        min-width: 200px;
      }
    }

    &-icon {
      min-width: 16px;
      margin-left: auto;
    }
  }

  &__multiselect {
    &-icon {
      margin-right: 18px;
    }

    &-option {
      height: 36px;
      width: 100%;
      padding: 8px 18px;
      display: flex;
      justify-content: space-between;
      gap: 8px;
      text-align: start;
      border-radius: 5px;
      align-items: center;
    }
  }

  &__performer {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__initial-assessment,
  &__spent-time {
    display: flex;
    justify-content: space-between;
    align-items: start;

    &:deep(.v-input__field) {
      width: 200px;
      height: 36px;
      border-radius: 5px;
      background-color: $grey-300;
    }
  }

  &__spent-time {
    margin-left: auto;
    &:deep(.v-input__field) {
      background-color: $grey-200;
    }
  }
}
</style>
