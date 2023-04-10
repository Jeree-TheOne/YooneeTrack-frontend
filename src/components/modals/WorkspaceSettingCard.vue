<script lang="ts">
import { defineComponent, PropType } from "vue";

import VModal from "../common/VModal.vue";
import VInput from "../common/VInput.vue";
import VButton from "../common/VButton.vue";
import VTag from "../common/VTag.vue";

import rowController from "@/controllers/rowController"


import { capitalizeFirstLetter } from "@/utils/formatters";
import Column from "@/models/Column";
import Row from "@/models/Row";
import TaskType from "@/models/TaskType";
import Tag from "@/models/Tag";
import Desk from "@/models/Desk";

import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import columnController from "@/controllers/columnController";
import taskTypeController from "@/controllers/taskTypeController";
import tagController from "@/controllers/tagController";
import deskController from "@/controllers/deskController";



export default defineComponent({
  components: {
    VModal,
    VInput,
    VButton,
    ColorPicker,
    VTag
  },

  props: {
    name: { type: String, default: ''},
    item: { type: Object as PropType<Column | Row | TaskType | Tag | Desk>, default: {}},
  },

  data() {
    return {
      localItem: null as unknown as Column | Row | TaskType | Tag | Desk,

      isAdd: false,
    }
  },

  methods: {
    closeModal(value: boolean) {
      this.$emit('close')
      if (value) this.$router.go(0)
    },

    async save() {
      if (this.isAdd) {
        switch (this.formattedName) {
          case 'row': 
          rowController.add(this.localItem.name)
            break;
          case 'column': 
            columnController.add(this.localItem.name)
            break;
          case 'taskType': 
            taskTypeController.add(this.localItem.name)
            break;
          case 'desk': 
            const { data } = await deskController.add(this.localItem.name)
            if ((this.localItem as any).is_current) {
              deskController.setCurrent(data.id)
            }
            break;
          case 'tag': 
            tagController.add(this.localItem.name, (this.localItem as any).background, (this.localItem as any).color)
            break;
        }
      }
      else {
        switch (this.formattedName) {
          case 'row': 
            rowController.update(this.localItem.id, this.localItem.name)
            break;
          case 'column': 
            columnController.update(this.localItem.id, this.localItem.name)
            break;
          case 'taskType': 
            taskTypeController.update(this.localItem.id, this.localItem.name)
            break;
          case 'desk': 
            deskController.update(this.localItem.id, this.localItem.name)
            if ((this.localItem as any).is_current) {
              deskController.setCurrent(this.localItem.id)
            }
            break;
          case 'tag':
            tagController.update(this.localItem.id, this.localItem.name, (this.localItem as any).background, (this.localItem as any).color)
            break;
        }
      }
      this.closeModal(true)
    },

    capitalizeFirstLetter
  },

  computed: {
    formattedName(): any {
      return this.name.slice(0, -1)
    },

    translation(): any {
      return { row: 'категорию', column: 'статус', desk: 'доску', tag: 'тэг', taskType: 'тип задачи' }
    }
  },

  watch: {
    item: {
      handler() {
        this.localItem = {...this.item}
        this.isAdd = !this.localItem.name
      },
      deep: true,
    }
  },
  rowController
})
</script>

<template>
  <v-modal @close="closeModal" fullscreen v-bind="$attrs">
    <div class="workspace-setting-card-modal">
      <div class="workspace-setting-card-modal__title">{{ isAdd ? 'Добавить' : 'Изменить' }} {{ translation[formattedName] }}</div>
      <v-input class="workspace-setting-card-modal__input" v-model="localItem.name" placeholder="Наименование"/>
      <div class="workspace-setting-card-modal__pickers" v-if="formattedName === 'tag'">
        <div class="workspace-setting-card-modal__picker">
          Цвет фона
          <color-picker format="hex" v-model:pure-color="(localItem as any).background"/>
        </div>
        <div class="workspace-setting-card-modal__picker">
          Цвет текста
          <color-picker format="hex" v-model:pure-color="(localItem as any).color"/>
        </div>
      </div>
      <div v-if="formattedName === 'tag'" class="workspace-setting-card-modal__preview">
        Превью тэга:
        <v-tag :background="(localItem as any).background" :color="(localItem as any).color">{{ localItem.name }}</v-tag>
      </div>
      <label v-if="formattedName === 'desk'" class="container">
        <input
        class="checkbox"
          type="checkbox"
          v-model="(localItem as any).is_current"
        >
        <span class="checkmark"></span>
        Текущая доска
      </label>
      <v-button @click="save">{{ isAdd ? 'Добавить' : 'Сохранить' }}</v-button>
    </div>
  </v-modal>
</template>

<style lang="scss" scoped>
.workspace-setting-card-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__title {
    font-size: 36px
  }

  &__input {
    width: 500px;
  }

  &__pickers {
    display: flex;
    gap: 16px;

    &:deep(.vc-color-wrap) {
      width: 100%;
      height: 36px;
      margin: 0;

      border-radius: 5px;
    }
  }

  &__picker {
    width: 100%;
  }

  &__checkbox {
    display: flex;
    gap: 8px;

    position: relative;
    cursor: pointer;

    align-items: center;

    &-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    &-checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #eee;
    }
  }

  .container {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: fixed;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: $grey-400;
  border-radius: 5px;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: $grey-300;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: $accent;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 8px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid $grey-200;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
}
</style>

