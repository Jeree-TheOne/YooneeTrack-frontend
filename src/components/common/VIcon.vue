<script lang="ts">
import { isBaseIconName } from "@/utils/components";
import { capitalizeFirstLetter } from "@/utils/formatters";
import { defineComponent } from "vue";

import LogoIcon from "../icons/LogoIcon.vue";
import CrossIcon from "../icons/CrossIcon.vue";
import SettingsIcon from "../icons/SettingsIcon.vue";
import SuccessIcon from "../icons/SuccessIcon.vue";
import CancelIcon from "../icons/CancelIcon.vue";
import PlusIcon from "../icons/PlusIcon.vue";
import CheckIcon from "../icons/CheckIcon.vue";
import ArrowDownIcon from "../icons/ArrowDownIcon.vue";
import QuestionMarkIcon from "../icons/QuestionMarkIcon.vue";
import ArrowBackIcon from "../icons/ArrowBackIcon.vue";
import UploadIcon from "../icons/UploadIcon.vue";


export default defineComponent({
  components: {
    CrossIcon,
    LogoIcon,
    SettingsIcon,
    SuccessIcon,
    CancelIcon,
    PlusIcon,
    CheckIcon,
    ArrowDownIcon,
    QuestionMarkIcon,
    ArrowBackIcon,
    UploadIcon
  },

  props: {
    name: {
      type: String,
      required: true,
      validator: isBaseIconName
    },

    size: { type: [ String, Number ], default: null }
  },

  computed: {
    iconName(): string {
      return `${capitalizeFirstLetter(this.name)}`
    },

    styles(): Object {
      return {
        'height': `${this.size}px`,
        'width': `${this.size}px`
      }
    }
  }
})
</script>

<template>
  <component
    :is="iconName"
    :style="styles"
    v-on="$attrs"
  />
</template>
