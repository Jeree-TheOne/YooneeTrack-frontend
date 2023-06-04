<script lang="ts">
import Column from "@/models/Column";
import TaskAll from "@/models/response/TaskAll";
import Row from "@/models/Row";
import deskService from "@/services/deskService";
import { defineComponent, PropType } from "vue";

import DeskRow from "./DeskRow.vue";

export default defineComponent({
  components: {
    DeskRow
  },

  props: {
    id: { type: String, required: true },
    columns: { type: Array as PropType<Column[]>, default: []},
    rows: { type: Array as PropType<Row[]>, default: []},
    search: { type: String, default: ''}
  },

  data() {
    return {
      tasks: null as unknown as TaskAll[]
    }
  },

  methods: {
    async init() {
      const desk  = await deskService.select(this.id)
      this.tasks = desk.tasks
    }
  },

  computed: {
    filteredTasks() {
      return this.tasks?.filter(task => 
        task.title.toLowerCase().includes(this.searchLower) || 
        task.description?.toLowerCase().includes(this.searchLower) || 
        task.taskType?.toLowerCase().includes(this.searchLower))
    },

    searchLower() {
      return this.search.toLowerCase()
    }
  },

  watch: {
    id: {
      handler() {
        this.init()
      },
      immediate: true
    }
  }
})
</script>

<template>
  <div class="desk">
    <div class="desk-columns">
      <div class="desk-column" v-for="column in columns">
        {{ column.name }}
      </div>
    </div>
    <desk-row v-bind="$attrs" v-for="row in rows" :id="row.id" :name="row.name" :tasks="filteredTasks?.filter(task => task.rowId === row.id)" :columns="columns"/>
  </div>
</template>

<style lang="scss" scoped>
.desk {
  padding: 16px 8px;
  overflow-y: auto;
  height: calc(100vh - 150px);
  &-columns {
    display: flex;
  }

  &-column {
    padding: 6px 18px;
    min-width: 180px;
    width: 100%;
    border-left: 1px solid $grey-500;
  }
}
</style>
