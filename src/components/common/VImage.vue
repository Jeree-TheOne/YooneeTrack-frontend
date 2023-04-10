<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    path: {
      type: String,
      required: true
    }
  },

  computed: {
    image() {
      return 'http://localhost:5000/' + this.path
    }
  }
})
</script>

<template>
  <img v-bind="$attrs" :src="image" class="v-image" />
</template>

<style lang="scss" scoped>
.v-image {
  background-size: contain;
  display: block;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;

  border-radius: 999px;
}
</style>
