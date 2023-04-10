<script lang="ts">
import { defineComponent } from 'vue'

import VMenu from '@/components/common/VMenu.vue'
import VButton from '@/components/common/VButton.vue'
import VIcon from '@/components/common/VIcon.vue'

export default defineComponent({
  components: { 
    VMenu, 
    VButton, 
    VIcon 
  },

  props: {
    title: { type: String, default: '' },
    // customClose: { type: Boolean, default: false },
    close: { type: Boolean, default: false },
    show: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    headerContentClass: { type: [ String, Object ], default: '' },
    cardClass: { type: String, default: '' },
    cardWrapperClass: { type: String, default: '' },
    contentClass: { type: [ String, Object, Array ], default: '' },
    closeOnContentClick: { type: Boolean, default: false },
  },

  data: () => ({
    localShow: false
  }),

  computed: {
    hasActivator(): boolean {
      return !!this.$slots.activator
    },
  },

  watch: {
    show: {
      handler() {
        this.localShow = this.show
      },
      immediate: true
    }
  },

  methods: {
    closeModal() {
      this.localShow = false

      this.$emit('close')
    },

    customCloseModal() {
      this.$emit('custom-close')
    }
  },
})
</script>

<template>
  <v-menu
    class="v-modal"
    :class="[{
      'v-modal--fullscreen': fullscreen,
      'v-modal--absolute' : hasActivator && !fullscreen,
    }]"
    card-wrapper-class="v-modal__card"
    :close-on-content-click="closeOnContentClick"
    :overlay="fullscreen"
    v-bind="$attrs"
    :show="localShow"
    @overlay-click="closeModal"
  >
    <template
      v-if="$slots.activator"
      #activator="{ attrs }"
    >
      <!-- @slot Активатор контента меню -->
      <slot
        name="activator"
        :attrs="attrs"
      />
    </template>
    <slot/>
  </v-menu>
</template>

<style lang="scss" scoped>
.v-modal {
  &--fullscreen & {
    position: initial;
    width: 100vw;
    height: 100vh;
  }

  &--fullscreen {
    &:deep(.v-modal__card)  {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      position: fixed;
      overflow: auto;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    } 
  }

  &__header,
  &__title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__header {
    gap: 28px;
  }

  &__header,
  &__header-content,
  &__content {
    padding-left: 24px;
    padding-right: 24px;
  }

  &__content {
    padding: 0 16px;
  }

  &__title-wrapper {
    width: 100%;
    gap: 18px;
  }

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }

  &__content {
    scrollbar-gutter: stable both-edges;
    overflow-y: auto;
    width: 100%;
    flex-grow: 1;
  }
}
</style>
