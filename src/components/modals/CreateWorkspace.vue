<script lang="ts">
import { defineComponent } from "vue";

import VModal from "../common/VModal.vue";
import VInput from "../common/VInput.vue";
import VButton from "../common/VButton.vue";

import workspaceService from "@/services/workspaceService";


export default defineComponent({
  components: {
    VModal,
    VInput,
    VButton
  },

  data() {
    return {
      name: "",
    }
  },

  methods: {
    create() {
      if (this.name.length < 5) return
      workspaceService.createWorkspace(this.name).then((data) => {
        this.$router.replace({name: 'Workspaces'})
        this.$router.go(0)
        this.$emit('close')
      })
    }
  }
})
</script>

<template>
  <v-modal fullscreen v-bind="$attrs">
    <div class="create-workspace-modal">
      <div class="create-workspace-modal__title">Создать рабочее пространство</div>
      <v-input v-model="name" placeholder="Название рабочего пространства" class="create-workspace-modal__input"/>
      <v-button class="create-workspace-modal__create" @click="create">Создать</v-button>
    </div>
  </v-modal>
</template>

<style lang="scss" scoped>
.create-workspace-modal {
  padding: 20px;
  width: 600px;

  display: flex;
  flex-direction: column;
  gap: 34px;

  &__title {
    font-size: 36px;
  }

  &__create {
    align-self: center;
  }
}
</style>
