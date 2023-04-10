<script lang="ts">
import { defineComponent } from "vue";
import VButton from "@/components/common/VButton.vue";
import VIcon from "@/components/common/VIcon.vue";
import { capitalizeFirstLetter } from "@/utils/formatters";


export default defineComponent({
  inheritAttrs: true,

  components: {
    VButton,
    VIcon,
  },

  props: {
    isEmpty: {
      type: Boolean,
      default: false
    },

    modelValue: {
      type: String,
      default: ""
    },

    placeholder: {
      type: String,
      default: ""
    }
  },

  emits: ['update:modelValue'],

  methods: {
    updateValue(event: Event) {
      this.emit((event.target as HTMLInputElement).value)
    },
    focus() {
      (this.$refs['input'] as HTMLInputElement).focus()
    },

    emit(value: string) {
      this.$emit('update:modelValue', value)
    },

    clear() {
      this.emit('')
    }
  },

  computed: {
    inputAttrs() {
      const attrs = {...this.$attrs}
      delete attrs.class
      return attrs
    }
  },

  capitalizeFirstLetter
})
</script>

<template>
  <div  class="v-input__container">
    <span v-if="placeholder" class="v-input__placeholder">{{ $options.capitalizeFirstLetter(placeholder) }}</span>
    <div class="v-input__field">
    <div v-if="$slots['prepend-data']">
      <slot name="prepend-data"/>
    </div>
    <input ref="input" class="v-input" :value="modelValue" @input="updateValue" v-bind="inputAttrs"/>
    <div v-if="$slots['append-data']">
      <slot name="append-data"/>
    </div>
      <v-button @click="clear" v-if="modelValue" size="20" icon>
        <v-icon size="20" name="crossIcon"/>
      </v-button>
  </div>
  </div>
</template>

<style lang="scss">
.v-input {
  outline: none;
  caret-color: $primary-dark;
  background-color: inherit;
  font-size: inherit;
  border: none;
  height: 100%;
  width: 100%;

  caret-color: $white;
  color: $white;

  &__field {
    height: 100%;
    width: 100%;

    background-color: $grey-200;
    color: $black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    border-radius: 7px;

    font-size: $font-size-big;
  }

  &__container {
    display: flex;
    flex-direction: column;

    align-items: start;
  }
}
</style>
