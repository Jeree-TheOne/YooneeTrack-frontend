<script lang="ts">
import { capitalizeFirstLetter } from '@/utils/formatters'
import { PropType, defineComponent } from 'vue'


export default defineComponent({
  props: {
    modelValue: { type: String, default: '' },
    block: { type: Boolean, default: false },
    autoGrow: { type: Boolean, default: false },
    rows: { type: [ String, Number ], default: 3 },
    placeholder: { type: String, default: '' },
    noResize: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMessages: { type: [ String, Array ] as PropType<string | string[]>, default: '' },
    wrapperClass: { type: String, default: '' },
    textareaClass: { type: String, default: '' }
  },

  computed: {
    vTextarea(): HTMLTextAreaElement {
      return this.$refs['v-textarea'] as HTMLTextAreaElement
    },

    classes(): Object {
      const baseClass = 'v-textarea'

      return {
        [`${baseClass}--block`]: this.block,
        [`${baseClass}--no-resize`]: this.noResize || this.autoGrow,
        [`${baseClass}--error`]: this.error
      }
    },

    errorMessage(): string {
      return Array.isArray(this.errorMessages)
        ? this.errorMessages[0]
        : this.errorMessages
    },

    formattedPlaceholder() {
      return capitalizeFirstLetter(this.placeholder)
    }
  },

  watch: {
    modelValue() {
      this.resize()
    }
  },

  methods: {
    inputHandler(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value)

      this.resize()
    },

    async resize() {
      if (!this.autoGrow) return

      await this.$nextTick()

      this.vTextarea.style.height = 'auto'

      const computedStyle = window.getComputedStyle(this.vTextarea)
      const paddingTop = computedStyle.getPropertyValue('padding-top')
      const paddingBottom = computedStyle.getPropertyValue('padding-bottom')

      this.vTextarea.style.height = `calc(${this.vTextarea.scrollHeight}px - ${paddingTop} - ${paddingBottom})`
    },
    capitalizeFirstLetter
  },

  mounted() {
    this.resize()
  }
})
</script>

<template>
  <label
    class="v-textarea"
    :class="classes"
  >
    {{ formattedPlaceholder }}
    <div
      class="v-textarea__textarea-wrapper"
      :class="wrapperClass"
    >
      <textarea
        ref="v-textarea"
        class="v-textarea__textarea"
        :class="textareaClass"
        :value="modelValue"
        :rows="autoGrow ? rows : undefined"
        :style="{ 'min-height': `${rows}em` }"
        v-bind="$attrs"
        @input="inputHandler"
      />

      <div
        v-if="$slots['prepend-inside']"
        class="v-textarea__prepend-inside"
      >
        <slot name="prepend-inside" />
      </div>

      <div
        v-if="$slots['append-inside']"
        class="v-textarea__append-inside"
      >
        <slot name="append-inside" />
      </div>
    </div>

    <div
      v-if="error"
      class="v-textarea__error-message"
    >
      {{ errorMessage }}
    </div>
  </label>
</template>

<style lang="scss" scoped>
.v-textarea {
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  &__textarea-wrapper {
    height: 100%;
    border-radius: 8px;
    background: $grey-200;
    border: 2px solid transparent;
    display: flex;
    gap: 12px;
    cursor: text;
  }

  &__textarea {
    padding: 9px 16px;
    margin: 0;
    width: 100%;
    box-sizing: content-box;
    outline: none;
    color: $white;
    caret-color: $white;
    resize: vertical;
    background: transparent;
    border: none;
  }

  &__prepend-inside {
    order: -10;
  }

  &__prepend-inside,
  &__append-inside {
    display: flex;
    align-items: center;
    width: fit-content;
    flex-shrink: 0;
  }

  &__error-message {
    color: $error;
  }

  &--block {
    width: 100%;
  }

  &--auto-grow &__textarea {
    overflow-y: hidden;
  }

  &--no-resize &__textarea {
    resize: none;
  }

  &--error &__textarea-wrapper {
    @include set-prop-states-values(border-color, $error);
  }
}
</style>
