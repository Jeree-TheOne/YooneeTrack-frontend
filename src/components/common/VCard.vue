<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  created() {
  }
})
</script>

<template>
  <div class="v-card">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.v-card {
  background-color: $grey-100;

  border-radius: 5px;
  padding: 14px;

  display: flex;

  align-items: center;
  flex-direction: column;
  gap: 18px;
}
</style>
