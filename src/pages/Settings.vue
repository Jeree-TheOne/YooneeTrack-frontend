<script lang="ts">
import Workspace from "@/models/response/Workspace";
import workspaceService from "@/services/workspaceService";
import { defineComponent } from "vue";

import SettingsRow from "@/components/custom/SettingsRow.vue";
import StorageService from "@/services/storageService";

import VButton from "@/components/common/VButton.vue";
import VIcon from "@/components/common/VIcon.vue";

export default defineComponent({
  components: {
    SettingsRow,
    VIcon,
    VButton
  },

  data() {
    return {
      workspace: null as unknown as Workspace
    }
  },

  methods: {
    async init() {
      this.workspace = await workspaceService.singleWorkspace(this.$route.params.workspace as string)
    },

    backToWorkspace() {
      this.$router.push(`../${StorageService.getItem('workspace')}/current`)
    }
  },

  computed: {
    items(): any {
      if (!this.workspace) return {}
      const { rows, columns, desks, tags, taskTypes  } = this.workspace
      return { rows, columns, desks, tags, taskTypes }
    }
  },

  created() {
    this.init()
  }
})
</script>

<template>
  <div class="settings">
    <v-button @click="backToWorkspace" text>
      <v-icon size="16" name="arrowBackIcon"/>
      <div>Вернуться назад</div>
    </v-button>
    <settings-row v-for="item in Object.keys(items)" :name="item" :items="items[item]"/>
  </div>
</template>

<style lang="scss">
.settings {
  display: flex;
  flex-direction: column;

  gap: 24px;

  padding: 24px 16px ;
}
</style>
