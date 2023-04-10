<script lang="ts">
import AvailableWorkspace from "@/models/response/AvailableWorkspace";
import { defineComponent } from "vue";

import VButton from "@/components/common/VButton.vue";
import VIcon from "@/components/common/VIcon.vue";
import VMenu from "@/components/common/VMenu.vue";

import WorkspaceCard from "@/components/custom/WorkspaceCard.vue";
import CreateWorkspaceModal from "@/components/Modals/CreateWorkspace.vue";

import workspaceService from "@/services/workspaceService";


export default defineComponent({
  components: {
    WorkspaceCard,

    CreateWorkspaceModal
  },

  data() {
    return {
      workspaces: null as unknown as AvailableWorkspace[],
      
    }
  },

  methods: {
    async init() {
      this.workspaces = await workspaceService.availableWorkspaces()
    },
  },

  created() {
    this.init()
  }
})
</script>

<template>
  <div class="workspaces__container">
    <div class="workspaces">
      <workspace-card class="workspaces__workspace-card" v-for="workspace in workspaces" :workspace="workspace"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workspaces { 
  height: 100%; 
  overflow: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;

  &__container {
    display: flex;
    flex-direction: column;
    margin: 12px;
    padding: 20px;

    background: $grey-300;
    height: calc(100% - 104px);
    border-radius: 20px;
  }

  &__title {
    margin-bottom: 20px;
    font-size: 32px;
  }

  &__workspace-card {
    width: auto;
    height: 130px;
  }
}
</style>
