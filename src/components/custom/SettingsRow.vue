<script lang="ts">
import Column from "@/models/Column";
import Desk from "@/models/Desk";
import Row from "@/models/Row";
import Tag from "@/models/Tag";
import TaskType from "@/models/TaskType";
import { capitalizeFirstLetter } from "@/utils/formatters";
import { defineComponent, PropType } from "vue";

import WorkspaceSettingCardModal from "../modals/WorkspaceSettingCard.vue";

import VButton from "../common/VButton.vue";
import VIcon from "../common/VIcon.vue";
import rowController from "@/controllers/rowController";
import columnController from "@/controllers/columnController";
import deskController from "@/controllers/deskController";
import tagController from "@/controllers/tagController";
import taskTypeController from "@/controllers/taskTypeController";

export default defineComponent({
  components: {
    VButton,
    VIcon,

    WorkspaceSettingCardModal
  },

  props: {
    name: { type: String, default: ''},
    items: { type: Array as PropType<Column[] | Row[] | Desk[] | Tag[] | TaskType[]>, default: []}
  },

  data() {
    return {
      isItemModalOpen: false,

      localItem: null as unknown as Column | Row | Desk | Tag | TaskType
    }
  },

  methods: {
    remove(id: string) {
      switch (this.name) {
        case 'rows': 
          rowController.delete(id)
          break;
        case 'columns': 
          columnController.delete(id)
          break;
        case 'taskTypes': 
          taskTypeController.delete(id)
          break;
        case 'desks': 
          deskController.delete(id)
          break;
        case 'tags': 
          tagController.delete(id)
          break;
      }
      this.$router.go(0)
    },

    openItem(item: Column | Row | Desk | Tag | TaskType) {
      this.toggleItemModal()
      this.localItem = item
    },

    toggleItemModal() {
      this.isItemModalOpen = !this.isItemModalOpen
    },

    closeTaskModal() {
      this.toggleItemModal()
      this.localItem = {} as any
    },

    capitalizeFirstLetter
  },

  computed: {
    translations(): any {
      return { rows: 'Категории', columns: 'Статусы', desks: 'Доски', tags: 'Тэги', taskTypes: 'Типы задач' }
    }
  }
})
</script>

<template>
  <div class="settings-row">
    <div class="settings-row__title">{{ translations[name] }}</div>
    <div class="settings-row__items">
      <v-button @click="openItem(item)" v-for="item in items" class="settings-row__item">
        {{ item.name }}
        <v-button @click.stop="remove(item.id)" size="20" icon>
          <v-icon size="20" name="crossIcon"/>
        </v-button>
      </v-button>
      <v-button text @click="openItem" class="settings-row__add">
        Добавить
      </v-button>
    </div>
    <workspace-setting-card-modal :name="name" :item="localItem" :show="isItemModalOpen" @close="closeTaskModal"/>
  </div>
</template>
<style lang="scss" scoped>
.settings-row {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__title {
    font-size: 24px;
  }

  &__items {
    display: flex;
    gap: 12px;
  }

  &__item {
    display: flex;
    gap: 16px;

    border: 1px solid $accent;
    border-radius: 8px;
    background-color: $grey-300;
    padding: 8px 12px;
  }

  &__add {
    margin-left: 16px;
  }
}
</style>
