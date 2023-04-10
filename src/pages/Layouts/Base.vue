<script lang="ts">
import { defineComponent } from "vue";

import TheHeader from "@/components/custom/TheHeader.vue";
import User from "@/models/response/User";
import jwtDecode from "jwt-decode";
import StorageService from "@/services/storageService";
import { refreshToken } from "@/interceptors/token-refresher";

export default defineComponent({
  data(){
    return {
      user: null as unknown as User
    }
  },

  methods: {
    updateUser() {
      this.user = jwtDecode(StorageService.getItem('token'))
    }
  },

  components: {
    TheHeader
  },

  created() {
    this.updateUser()
  }
})
</script>

<template>
  <div class="base-layout">
    <the-header :user="user"/>
    <router-view @refresh="updateUser" :user="user"/>
  </div>
</template>

<style lang="scss">
.base-layout {
  display: flex;
  flex-direction: column;

  height: 100%;

  overflow: hidden;
}
</style>
