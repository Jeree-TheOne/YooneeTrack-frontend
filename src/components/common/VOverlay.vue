<template>
  <transition
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="show"
      class="v-overlay"
      :style="styles"
      v-bind="$attrs"
    />
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { FADE } from '@/constants/animations'

import { AnimationName, AnimationTransitions } from '@/models/animation'
import animationService from '@/services/animationService'

let overlayAnimation: AnimationTransitions

export default defineComponent({
  props: {
    zIndex: { type: [ String, Number ], default: 0 },
    opacity: { type: Number, default: 0.38 },
    transitionDuration: { type: [ String, Number ], default: 250 },
    transition: { type: String as PropType<AnimationName>, default: FADE },
    show: { type: Boolean, default: false }
  },

  computed: {
    styles(): Object {
      return {
        'z-index': this.zIndex,
        'opacity': this.opacity,
        'transition-duration': `${this.transitionDuration}ms`
      }
    }
  },

  methods: {
    enter(element: HTMLElement, done: Function) {
      overlayAnimation.enter({ targets: element, done })
    },
    leave(element: HTMLElement, done: Function) {
      overlayAnimation.leave({ targets: element, done })
    }
  },

  mounted() {
    overlayAnimation = animationService(
      this.transition,
      {
        duration: this.transitionDuration,
        opacity: this.opacity
      }
    )
  }
})
</script>

<style lang="scss" scoped>
.v-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: $black;
}
</style>
