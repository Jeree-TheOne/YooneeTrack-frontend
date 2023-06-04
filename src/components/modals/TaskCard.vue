<script lang="ts">
import axios from 'axios'
import { defineComponent, PropType } from "vue";

import VModal from "../common/VModal.vue";
import VInput from "../common/VInput.vue";
import VTextarea from "../common/VTextarea.vue";
import VButton from "../common/VButton.vue";
import VSelect from "../common/VSelect.vue";
import VIcon from "../common/VIcon.vue";
import VDropFile from "../common/VDropFile.vue";
import VImage from "../common/VImage.vue";

import Task from "@/models/Task";
import Workspace from "@/models/response/Workspace";
import taskService from "@/services/taskService";
import WallHistory from "@/models/response/wall/WallHistory";
import Comment from "@/models/response/wall/Comment";
import SpentTime from "@/models/response/wall/SpentTime";

import Multiselect from '@vueform/multiselect'
import { fromNumberToTime, fromTimeToNumber, isTimeValid, capitalizeFirstLetter, date } from "@/utils/formatters";



export default defineComponent({
  components: {
    VModal,
    VInput,
    VButton,
    VTextarea,
    VSelect,
    VIcon,
    Multiselect,
    VDropFile,
    VImage
  },

  props: {
    task: { type: Object as PropType<Task>, default: {}},
    workspace: { type: Object as PropType<Workspace>, default: {}},
  },

  data() {
    return {
      localTask: null as unknown as Task,
      wall: null as unknown as (WallHistory | Comment | SpentTime)[],

      isAdd: null as unknown as Boolean,
      isEdit: false,

      files: [] as File[]
    }
  },

  methods: {
    async save() {
      if (this.isAdd) {
        const { title, description, rowId, columnId, taskTypeId, tags, initialAssessment, performerId  } = this.localTask
        const deskId = this.$route.params.deskId === 'current' ? this.workspace.desks.find(desk => desk.isCurrent)?.id || '' : this.$route.params.deskId as string
        await taskService.add(title, description, rowId, columnId, deskId as string, taskTypeId, tags, initialAssessment, performerId, this.files)
      }

      else {
        const { id, title, description, rowId, columnId, taskTypeId, tags, initialAssessment,  performerId } = this.localTask
        const deskId = this.$route.params.deskId === 'current' ? this.workspace.desks.find(desk => desk.isCurrent)?.id || '' : this.$route.params.deskId as string
        await taskService.update(id, title, description, rowId, columnId, deskId, taskTypeId, tags, initialAssessment, performerId, this.files)
      }
    this.$emit('close')
    },

    edit() {
      this.isEdit = !this.isEdit
    },

    closeModal() {
      this.localTask = {} as Task;
      this.isAdd = null as unknown as Boolean
      this.isEdit = false
      this.$emit('close')
    },

    rowChange(row: string) {
      this.localTask.rowId = row
    },

    columnChange(column: string) {
      this.localTask.columnId = column
    },

    taskTypeChange(taskType: string) {
      this.localTask.taskTypeId = taskType
    },

    performerChange(performer: string) {
      this.localTask.performerId = performer
    },

    changeFiles(files: File[]) {
      this.files = files
    },
    updateAssessment(value: string) {
      this.localTask.initialAssessment = fromTimeToNumber(value)
    },

    updateSpent(value: string) {
      this.localTask.spentTime = fromTimeToNumber(value)
    },

    fileHref(path: string) {
      return import.meta.env.VITE_API_URL + '/' + path
    },

    fromNumberToTime,
    capitalizeFirstLetter,
    date
  },

  computed: {
    saveText() {
      if (this.isAdd) return 'Добавить'
      return 'Сохранить'
    },

    author() {
      return this.workspace.members.find(member => member.id === this.localTask.authorId)
    },

    updater() {
      return this.workspace.members.find(member => member.id === this.localTask.updaterId)
    },

    historyFields() {
      return {
        title: 'Заголовок',
        description: 'Описание',
        performerId: 'Исполнитель',
        tags: 'Тэги',
        files: 'Файлы',
        taskTypeId: 'Тип задачи',
        columnId: 'Статус задачи',
        rowId: 'Категория задачи',
        initialAssessment: 'Начальная оценка задачи',
      }
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
            this.wall = await taskService.getWall(this.localTask.id)
          }
          else this.localTask.taskTypeId = this.workspace.taskTypes[0].id
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
      <div class="task-card-modal__header">
        <div v-if="author" class="task-card-modal__user">
          Добавлено: 
          <div  class="task-card-modal__user-block">
            <v-image :path="author.avatar"/>
            <div class="task-card-modal__user-info">
              <div class="task-card-modal__user-email">{{ author.email }}</div>
              <div class="task-card-modal__user-action-time">{{ date(localTask.createdAt) }}</div>
            </div>
          </div>
        </div>
        <div v-if="updater" class="task-card-modal__user">
          Изменено:
          <div class="task-card-modal__user-block">
            <v-image :path="updater.avatar"/>
            <div class="task-card-modal__user-info">
              <div class="task-card-modal__user-email">{{ updater.email }}</div>
              <div v-if="localTask.updatedAt" class="task-card-modal__user-action-time">{{ date(localTask.updatedAt) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="task-card-modal__body">
        <div class="task-card-modal__main">
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
        <div class="task-card-modal__main-bottom">
          <v-button class="task-card-modal__create" @click="save">{{ saveText }}</v-button>
          <v-input v-if="!isAdd" class="task-card-modal__spent-time" placeholder="Потрачено времени" @update:modelValue="updateSpent" :modelValue="fromNumberToTime(localTask.spentTime || 0)"/>
        </div>
        </div>
        <hr class="task-card-modal__divider">
        <div class="task-card-modal__sidebar">
        <v-select class="task-card-modal__select-container" @change="taskTypeChange" :value="task.taskTypeId" :items="workspace.taskTypes" itemText="name" itemValue="id" placeholder="Тип задачи">
          <template #activator="{ attrs }">
            <v-button class="task-card-modal__select" @click="attrs.click">
              {{ workspace.taskTypes.find(taskType => taskType.id === localTask.taskTypeId)?.name }}
              <v-icon class="task-card-modal__select-icon" size="16" name="arrowDownIcon"/>
            </v-button>
          </template>
        </v-select>
        <v-select class="task-card-modal__select-container" @change="rowChange" :value="localTask.rowId" :items="workspace.rows" itemText="name" itemValue="id" placeholder="Категория">
          <template #activator="{ attrs }">
            <v-button class="task-card-modal__select" @click="attrs.click">
              {{ workspace.rows.find(row => row.id === localTask.rowId)?.name }}
              <v-icon class="task-card-modal__select-icon" size="16" name="arrowDownIcon"/>
            </v-button>
          </template>
        </v-select>
        <v-select class="task-card-modal__select-container" @change="columnChange" :value="localTask.columnId" :items="workspace.columns" itemText="name" itemValue="id" placeholder="Статус">
          <template #activator="{ attrs }">
            <v-button class="task-card-modal__select" @click="attrs.click">
              {{ workspace.columns.find(column => column.id === localTask.columnId)?.name }}
              <v-icon class="task-card-modal__select-icon" size="16" name="arrowDownIcon"/>
            </v-button>
          </template>
        </v-select>
        <v-select class="task-card-modal__select-container" @change="performerChange" :value="localTask.performerId" :items="workspace.members" itemText="email" itemValue="id" placeholder="Исполнитель">
          <template #activator="{ attrs }">
            <v-button class="task-card-modal__select" @click="attrs.click">
              <div class="task-card-modal__performer">
                {{ workspace.members.find(member => member.id === localTask.performerId)?.email }}
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
        <v-input class="task-card-modal__initial-assessment" placeholder="Оценка задачи по времени" @update:modelValue="updateAssessment" :modelValue="fromNumberToTime(localTask.initialAssessment || 0)"/>
        <v-button v-if="!isAdd" class="task-card-modal__edit" @click="edit">{{ isEdit ? 'Отменить' : 'Редактировать' }}</v-button>
        </div>
      </div>
      <div class="task-card-modal__wall">
        <div v-for="item in wall" class="task-card-modal__wall-row">
          <div class="task-card-modal__wall-block" v-if="item.type === 'history'">
            <div  class="task-card-modal__user-block">
              <v-image :path="workspace.members.find(member => member.id === item.userId)?.avatar"/>
              <div class="task-card-modal__user-info">
                <div class="task-card-modal__user-email">{{ workspace.members.find(member => member.id === item.userId)?.email }}</div>
                <div class="task-card-modal__user-action-time">{{ date(item.createdAt) }}</div>
              </div>
            </div>
            <div>Изменено:</div>
            <div v-for="updatedField, index in item.updatedFields">
              {{ historyFields[updatedField] }} 
                <div v-if="updatedField === 'tags'">
                  {{ item.previousValues[index].split(',').map(tag => workspace.tags.find(t => t.id == tag).name).join(', ') }} ->
                  {{ item.fieldsValues[index].split(',').map(tag => workspace.tags.find(t => t.id == tag).name).join(', ') }}
                </div>
                <div v-else-if="updatedField === 'performerId'">
                  {{ workspace.members.find(member => member.id === item.previousValues[index])?.email  }} ->
                  {{ workspace.members.find(member => member.id === item.fieldsValues[index]).email }}
                </div>
                <div v-else-if="updatedField === 'taskTypeId'">
                  {{ workspace.taskTypes.find(taskType => taskType.id === item.previousValues[index]).name  }} ->
                  {{ workspace.taskTypes.find(taskType => taskType.id === item.fieldsValues[index]).name }}
                </div>
                <div v-else-if="updatedField === 'columnId'">
                  {{ workspace.columns.find(column => column.id === item.previousValues[index]).name  }} ->
                  {{ workspace.columns.find(column => column.id === item.fieldsValues[index]).name }}
                </div>
                <div v-else-if="updatedField === 'rowId'">
                  {{ workspace.rows.find(row => row.id === item.previousValues[index]).name  }} ->
                  {{ workspace.rows.find(row => row.id === item.fieldsValues[index]).name }}
                </div>
                <div v-else-if="updatedField === 'initialAssessment'">
                  {{ fromNumberToTime(item.previousValues[index]) }} ->
                  {{ fromNumberToTime(item.fieldsValues[index]) }}
                </div>
                <div v-else-if="updatedField !== 'files'"> 
                  {{ item.previousValues[index] }} -> 
                  {{ item.fieldsValues[index] }}
                </div>
            </div> 
          </div>
          <div class="task-card-modal__wall-block" v-else-if="item.type === 'comment'">
            <div  class="task-card-modal__user-block">
              <v-image :path="workspace.members.find(member => member.id === item.userId)?.avatar"/>
              <div class="task-card-modal__user-info">
                <div class="task-card-modal__user-email">{{ workspace.members.find(member => member.id === item.userId)?.email }}</div>
                <div class="task-card-modal__user-action-time">{{ date(item.createdAt) }}</div>
              </div>
            </div>
            {{ item.text }}
          </div>
          <div class="task-card-modal__wall-block" v-else-if="item.type === 'spentTime'">
            <div class="task-card-modal__user-block">
              <v-image :path="workspace.members.find(member => member.id === item.userId)?.avatar"/>
              <div class="task-card-modal__user-info">
                <div class="task-card-modal__user-email">{{ workspace.members.find(member => member.id === item.userId)?.email }}</div>
                <div class="task-card-modal__user-action-time">{{ date(item.createdAt) }}</div>
              </div>
            </div>
            Потрачено времени: {{ fromNumberToTime(item.currentTimeSpent) || '0' }} -> {{ fromNumberToTime(item.currentTimeSpent + item.spentTime) }}
          </div>
        </div>
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
  max-height: 700px;

  display: flex;
  flex-direction: column;

  &__wall {
    display: flex;
    flex-direction: column;

    padding: 14px 0;

    gap: 8px;

    &-block {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 12px;
    }
  }

  &__header {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
  }

  &__user {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &-block {
      display: flex;
      gap: 16px;

      align-items: center;
    }

    &-action-time {
      color: $grey-600;
      font-size: 12px;
    }
  }

  &__body {
    display: flex;
  gap: 16px;
  }

  &__main {
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
      background-color: $grey-300;
    }
  }
}
</style>
