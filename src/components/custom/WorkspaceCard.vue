<script lang="ts">
import AvailableWorkspace from "@/models/response/AvailableWorkspace";
import { defineComponent, PropType } from "vue";

import VButton from "@/components/common/VButton.vue";
import VIcon from "@/components/common/VIcon.vue";
import VMenu from "@/components/common/VMenu.vue";
import workspaceService from "@/services/workspaceService";


export default defineComponent({
  components: {
    VButton,
    VIcon,
    VMenu
  },

  props: {
    workspace: { type: Object as PropType<AvailableWorkspace>, default: {}}
  },

  data() {
    return {
      editable: false,
      tempName: this.workspace.name
    }
  },

  methods: {
    edit() {
      this.editable = !this.editable;
      this.$nextTick(() => {
        (this.$refs['name'] as HTMLInputElement).focus()
      })
      if (!this.editable) {
        (this.$refs['name'] as HTMLElement).innerText = this.tempName
      }
    },

    remove() {

    },

    save() {
      const name = (this.$refs['name'] as HTMLElement).innerText
      if (name.length < 5) return this.edit()
      workspaceService.changeWorkspaceName(this.workspace.id, name);
      this.tempName = name;
      this.edit()
    },

    open() {
      this.$router.push(`workspace/${this.workspace.id}/current`)
    }
  }
})
</script>

<template>
  <div @click="open" class="workspace-card">
      <div @click.stop class="workspace-card__name" ref="name" :contenteditable="editable">{{ workspace.name }}</div>
      <div class="workspace-card__bottom-panel">
        <v-menu left card-class="workspace-card__settings-options">
          <template #activator="{ attrs }">
            <v-button @click.stop="attrs.click" class="workspace__settings-button" size="24" icon>
              <v-icon size="24" name="settingsIcon"/>
            </v-button>
          </template>
            <v-button class="workspace-card__option" text @click.stop="edit">Изменить</v-button>
            <v-button class="workspace-card__option" text @click.stop="remove">Удалить</v-button>
        </v-menu>
        <div class="workspace-card__edit-buttons" v-if="editable">
          <v-button @click.stop="edit" size="24" icon>
            <v-icon size="24" name="cancelIcon"/>
          </v-button>
          <v-button @click.stop="save" size="24" icon>
            <v-icon size="24" name="successIcon"/>
          </v-button>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .workspace-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 16px;

    border: 2px solid $grey-100;
    border-radius: 12px;

    background-color: $grey-200;

    cursor: pointer;

    &__name {
      word-wrap: break-word;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &__settings-options {
      width: 100px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      align-items: start;
      justify-content: start;
    }

    &__option {
      font-size: $font-size-small;
    }

    &__bottom-panel {
      display: flex;
      justify-content: space-between;

      margin-top: 16px;
    }

    &__edit-buttons {
      display: flex;
      gap: 8px;
    }
  }

</style>
