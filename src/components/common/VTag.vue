<script lang="ts">
import { defineComponent, StyleValue } from "vue";
export default defineComponent({
  props: {
    color: { type: String, default: '#000000'},
    background: { type: String, default: '#ffffff'},
  },

  computed: {
    styles(): StyleValue {
      return {
        'color': this.color,
        'background-color': this.background
      }
    }
  }
})
</script>

<template>
  <div class="v-tag" :style="styles">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
.v-tag {
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 1000px;
}
</style>
