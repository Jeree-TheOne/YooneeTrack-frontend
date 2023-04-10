<script lang="ts">
import { defineComponent, PropType, StyleValue } from "vue";

import VCard from "./VCard.vue";
import VOverlay from "./VOverlay.vue";

export default defineComponent({
  components: {
    VCard,
    VOverlay
  },

  props: {
    closeOnClick: { type: Boolean, default: true },
    closeOnContentClick: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    bottom: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    top: { type: Boolean, default: false },
    cardClass: { type: [ String, Array ] as PropType<string | string[]>, default: '' },
    cardWrapperClass: { type: [ String, Array ] as PropType<string | string[]>, default: '' },
    show: { type: Boolean, default: false },
    offsetX: { type: [ String, Number ], default: 0 },
    offsetY: { type: [ String, Number ], default: 0 },
    overlay: { type: Boolean, default: false },
    zIndex: { type: Number, default: 3 }
  },

  data() {
    return {
      localShow: false
    }
  },

  methods: {
    activatorHandler() {
      // if (this.disabled) return
      this.toggleContentShow()
    },

    toggleContentShow() {
      this.localShow = !this.localShow
    },

    contentClickHandler() {
      if (this.closeOnContentClick) this.toggleContentShow()
    }
  },

  computed: {
    attrs() {
      return { ...this.$attrs, ...this.on}
    },

    on(): Object {
      return {
        click: this.activatorHandler
      }
    },

    hasActivator(): boolean {
      return !!this.$slots.activator
    },

    menuClasses(): Object {
      const baseClass = 'v-menu'

      return {
        [`${baseClass}--left`]: !this.hasActivator && this.left,
        [`${baseClass}--bottom`]: !this.hasActivator && this.bottom,
        [`${baseClass}--right`]: !this.hasActivator && this.right,
        [`${baseClass}--top`]: !this.hasActivator && this.top,
        [`${baseClass}--fixed`]: !this.hasActivator
      }
    },

    contentWrapperClasses(): Object {
      const baseClass = 'v-menu__content-wrapper'

      const cardWrapperClass = Array.isArray(this.cardWrapperClass)
        ? this.cardWrapperClass.reduce((classObject, value) => ({ ...classObject, [value]: value }), {})
        : { [this.cardWrapperClass]: this.cardWrapperClass }

      return {
        [`${baseClass}--left`]: this.hasActivator && this.left,
        [`${baseClass}--bottom`]: this.hasActivator && this.bottom,
        [`${baseClass}--right`]: this.hasActivator && this.right,
        [`${baseClass}--top`]: this.hasActivator && this.top,
        ...cardWrapperClass
      }
    },

    styles(): StyleValue {
      return {
        'margin-left': `${this.offsetX}px`,
        'margin-right': `${-this.offsetX}px`,
        'margin-top': `${this.offsetY}px`,
        'margin-bottom': `${-this.offsetY}px`,
        'z-index': this.zIndex + 1
      }
    },

    isOverlayShow(): boolean {
      return this.localShow && this.overlay
    }
  },

  watch: {
    show: {
      handler() {
        this.localShow = this.show
      },
      immediate: true
    }
  },
})
</script>

<template>
  <div class="v-menu" :style="hasActivator ? '' : styles">
    <slot name="activator" :attrs="attrs"/>
    <div class="v-menu__content-wrapper" :class="contentWrapperClasses"  v-if="localShow">
      <v-card  @click="contentClickHandler" :class="cardClass" class="v-menu__content">
        <slot/>
      </v-card>
    </div>
    <v-overlay
      @click="$emit('overlay-click')"
      :show="isOverlayShow"
      :z-index="zIndex"
    />
  </div>
</template>

<style lang="scss" scoped>
.v-menu {
  position: relative;

  &__content-wrapper {
    width: fit-content;
    height: fit-content;
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 4;

    &--left {
      left: 0;
    }

    &--bottom {
      top: 100%;
    }

    &--right {
      right: 0;
    }

    &--top {
      bottom: 100%;
    }
  }

  &__content {
    transform-origin: center;
    overflow: auto;
    height: fit-content;
  }
}
</style>
