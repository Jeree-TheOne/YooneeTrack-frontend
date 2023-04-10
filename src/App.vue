<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  created() {
  }
})
</script>

<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: $primary-dark;

  color: $white;
}
</style>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
