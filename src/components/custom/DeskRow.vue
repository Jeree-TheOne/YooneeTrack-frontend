<script lang="ts">
import Column from "@/models/Column";
import TaskAll from "@/models/response/TaskAll";
import { defineComponent, PropType } from "vue";

import VIcon from "../common/VIcon.vue";
import VButton from "../common/VButton.vue";
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  components: {
    VButton,
    VIcon,
    TaskCard
  },

  props: {
    tasks: { type: Array as PropType<TaskAll[]>, default: null},
    id: { type: String, default: ''},
    name: { type: String, default: ''},
    columns: { type: Array as PropType<Column[]>, default: []},
  },

  methods: {
    tasksInColumn(columnId: string): TaskAll[] {
      return this.tasks.filter(task => task.column_id === columnId)
    },

    openAddTaskModal(columnId: string) {
      this.$emit('addTask', {columnId, rowId: this.id})
    }
  }
})
</script>

<template>
  <div class="desk-row" v-if="tasks">
    <div class="desk-row__header">
      <div class="desk-row__name">{{ name }}</div>
      <div class="desk-row__count">Кол-во карточек: {{ tasks.length }}</div>
    </div>
    <div class="desk-row__columns">
      <div class="desk-row__column" v-for="column in columns">
        <task-card v-bind="$attrs" v-for="task in tasksInColumn(column.id)" :task="task"/>
        <v-button size="32" @click="openAddTaskModal(column.id)" icon>
          <v-icon size="32" name="plusIcon"/>
        </v-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desk-row {
  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 16px;
    height: 44px;

    width: 100%;
  }

  &__name {
    position: sticky;
    left: 0;
    font-size: 18px;
  }

  &__count {
    position: sticky;
    right: 0;
    font-size: 12px;
    color: $accent;
  }

  &__columns {
    display: flex;
  }

  &__column {
    padding: 6px 18px;
    min-width: 350px;
    width: 100%;
    border-left: 1px solid $grey-500;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>

<style>
.desk-row {
  width: max(fit-content, 100%);
}
</style>
