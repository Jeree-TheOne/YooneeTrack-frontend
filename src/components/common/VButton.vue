<script lang="ts">
import { defineComponent, PropType, StyleValue } from "vue";
import { RouteLocationRaw } from 'vue-router'

export default defineComponent({
  inheritAttrs: false,

  props: {
    to: { type: [ String, Object ] as PropType<RouteLocationRaw>, default: null },
    href: { type: String, default: '' },
    icon: { type: Boolean, default: false },
    text: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    filled: { type: Boolean, default: true },
    light: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    size: { type: [ String, Number ], default: null },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },

  computed: {
    classes(): Object {
      const baseClass = 'v-button'

      return {
        [`${baseClass}--filled`]: this.filled,
        [`${baseClass}--icon`]: this.icon,
        [`${baseClass}--text`]: this.text,
        [`${baseClass}--link`]: this.href,
        [`${baseClass}--block`]: this.block,
        [`${baseClass}--disabled`]: this.disabled,
        [`${baseClass}--light`]: this.light,
        [`${baseClass}--outline`]: this.outline,
        [`${baseClass}--error`]: this.error,
        [`${baseClass}--loading`]: this.loading,
      }
    },

    styles(): StyleValue {
      return {
        'height': `${this.size}px`,
        'width': `${this.size}px`
      }
    }
  }
})
</script>

<template>
  <a
    v-if="href"
    class="v-button"
    :class="classes"
    :style="styles"
    :href="href"
    v-bind="$attrs"
  >
    <slot />
  </a>

  <router-link
    v-else-if="to"
    class="v-button"
    :class="classes"
    :style="styles"
    :to="to"
    v-bind="$attrs"
  >
    <slot />
  </router-link>

  <button
    v-else
    class="v-button"
    :class="classes"
    :style="styles"
    :disabled="disabled"
    type="button"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style lang="scss">
.v-button {
  padding: 10px 18px;
  border-radius: 15px;

  outline: none;
  width: fit-content;
  border: none;
  background: none;
  transition-duration: $transition-duration;
  transition-property: color, background;

  &, * {
    cursor: pointer;
  }

  &--filled {
    color: $white;

    @include set-prop-states-values(background, $grey-300, $grey-400);
  }

  &--light {
    @include set-prop-states-values(color, $grey-200);
    @include set-prop-states-values(background, $primary-light, $accent);
  }

  &--outline {
    @include set-prop-states-values(color, $white, $accent);
    @include set-prop-states-values(background, transparent, $primary);
  }

  &--link {
    @include set-prop-states-values(color, $white, $accent, $accent-light);
    @include set-prop-states-values(background, none);
    padding: 0;
    text-decoration: none;
  }

  &--icon {
    padding: 0;

    @include set-prop-states-values(color, $accent, $accent-light);
    @include set-prop-states-values(background, transparent);
  }

  &--text {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0;
    @include set-prop-states-values(color, $white, $accent);
    @include set-prop-states-values(background, transparent);
  }

  &--block {
    width: 100%;
  }

  &--error {
    @include set-prop-states-values(color, $white);
    @include set-prop-states-values(background, $red-100, $red-200);
  }

  &--disabled {
    @include set-prop-states-values(color, $white);
    @include set-prop-states-values(background, $grey-400);

    &,
    * {
      cursor: not-allowed;
    }
  }
}
</style>
