<template>
  <div class="v-select__container">
    <div v-if="placeholder">{{ formattedPlaceholder }}</div>
    <v-menu
    class="v-select"
    card-class="v-select__card"
    card-wrapper-class="v-select__card-wrapper"
    v-bind="$attrs"
    @toggle="updateShow"
  >
    <template #activator="{ attrs }">
      <slot
        name="activator"
        :attrs="attrs"
      >
      </slot>
    </template>

    <div class="v-select__options">
      <v-button
        v-for="(option, index) in options"
        :key="index"
        class="v-select__option"
        text
        @click="optionClickHandler(option)"
      >
        {{ option.text }}

        <v-icon
          class="v-select__option-check-icon"
          :class="{ 'v-select__option-check-icon--active': isOptionChecked(option) }"
          name="checkIcon"
        />
      </v-button>
    </div>
  </v-menu>
  </div>
</template>

<script lang="ts">
import { SelectOption } from '@/models/components/VSelect'
import { defineComponent, PropType } from 'vue'

import VMenu from './VMenu.vue'
import VButton from './VButton.vue'
import VIcon from './VIcon.vue'

import { isEqual } from 'lodash'
import { capitalizeFirstLetter } from '@/utils/formatters'


export default defineComponent({
  components: {
    VMenu,
    VButton,
    VIcon
  },

  props: {
    value: { type: undefined as unknown as PropType<any>, default: undefined },
    items: { type: Array as PropType<any[]>, default: () => [] },
    itemText: { type: String, default: 'text' },
    itemValue: { type: String, default: 'value' },
    placeholder: { type: String, default: ''}
  },

  computed: {
    options(): SelectOption[] {
      return this.items.map(item => ({
        text: item.hasOwnProperty(this.itemText) ? String(item[this.itemText]) : item,
        value: item.hasOwnProperty(this.itemValue) ? item[this.itemValue] : item
      }))
    },

    formattedPlaceholder() {
      return capitalizeFirstLetter(this.placeholder)
    }
  },

  methods: {
    isOptionChecked(option: SelectOption): boolean {
      return isEqual(option.value, this.value)
    },

    optionClickHandler(option: SelectOption) {
      if (this.isOptionChecked(option)) return

      this.$emit('change', option.value)
    },
    
    updateShow(isShow: boolean) {
      this.$emit('update:show', isShow)
    }
  },
})
</script>

<style lang="scss" scoped>
.v-select {
  &:deep(*) & {
    &__card {
      padding: 0;
      max-height: 240px;
      overflow-y: auto;
      width: fit-content;
      background-color: $grey-200;
    }

    &__card-wrapper {
      width: fit-content;
      position: absolute;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;

    align-items: start;
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 4px
  }

  &__option {
    min-width: 230px;
    height: 36px;
    width: 100%;
    padding: 8px 18px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    text-align: start;
    border-radius: 5px;
    align-items: center;

    @include set-prop-states-values(color, $white);

    &:hover {
      background: $grey-400 !important;
    }
  }

  &__option:hover &__option-check-icon {
    opacity: 1;
  }

  &__option-check-icon {
    height: 14px;
    width: 14px;
    opacity: 0;
    transition-duration: $transition-duration;
    transition-property: opacity, background;

    &--active {
      opacity: 1;
    }
  }
}
</style>
