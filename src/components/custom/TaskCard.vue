<script lang="ts">
import Tag from "@/models/Tag";

import VTag from "../common/VTag.vue";
import VImage from "../common/VImage.vue";
import VIcon from "../common/VIcon.vue";

import { defineComponent, PropType, StyleValue } from "vue";
import { capitalizeFirstLetter, fromNumberToTime, fromTimeToNumber } from "@/utils/formatters";
import TaskAll from "@/models/response/TaskAll";
export default defineComponent({
  components: {
    VTag,
    VImage,
    VIcon
  },

  props: {
    task: { type: Object as PropType<TaskAll>, default: {} }
  },

  methods: {
    capitalizeFirstLetter,
    fromNumberToTime,
    fromTimeToNumber,

    openTaskCard() {
      this.$emit('openTask', this.task.id)
    }
  },

  computed: {
    tags(): Tag[] {
      return this.$attrs.tags as Tag[]
    },

    taskTags() {
      return this.tags?.filter((tag: Tag) => this.task.tags.includes(tag.id))
    },

    completed() {
      if (!this.task.initial_assessment || Number(this.task.initial_assessment) < this.task.spent_time) return '0%'
      return (this.task.spent_time / this.task.initial_assessment * 100) + '%'
    },

    assessment() {
      if (!this.task.initial_assessment) return '?'
      return fromNumberToTime(this.task.initial_assessment)
    },

    styles(): StyleValue {
      if (!this.task.initial_assessment) return {}
      if (Number(this.task.initial_assessment) < this.task.spent_time)
      return {
        'background-color': 'red'
      }
      return {}
    }
  }
})
</script>

<template>
  <div @click="openTaskCard" v-if="task.id" class="task-card">
    <div class="task-card__header">
      <div class="task-card__title">{{ task.title ? capitalizeFirstLetter(task.title) : '' }}</div>
      <div class="task-card__task-type">{{ task.task_type ? capitalizeFirstLetter(task.task_type) : '' }}</div>
      <v-tag class="task-card__tag" v-for="tag in taskTags" :color="tag.color" :background="tag.background">{{ capitalizeFirstLetter(tag.name) }}</v-tag>
    </div>
    <div class="task-card__body">
      {{ task.description && task.description !== 'null' ? task.description : 'Нет описания' }}
    </div>
    <div class="task-card__footer">
      <div class="task-card__performer">
        <v-image class="task-card__performer-avatar" v-if="task.performer_avatar" :path="task.performer_avatar"/>
        <v-icon v-else size="24" name="questionMarkIcon"/>
        <div v-if="task.performer_email">{{ task.performer_email }}</div>
      </div>
      <div class="task-card__spend">
        <div class="task-card__circle" :style="styles"/>
        <div class="task-card__assessment-time">{{ assessment }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-card {
  background-color: $grey-300;
  border-radius: 12px;
  border: 1px solid $accent-light;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  cursor: pointer;

  @include set-prop-states-values(background-color, $grey-300, $grey-500);

  &__header {
    display: flex;
    flex-wrap: nowrap;
    gap: 12px;
    align-items: center;

    overflow: hidden;
  }

  &__title {
    font-weight: 600;
  }

  &__title,
  &__task-type {
    white-space: nowrap;
  } 

  &__body {
    color: $grey-600;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__footer {
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    height: 30px;
  }

  &__performer {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    &-avatar {
      min-width: 32px;
      display: flex;
      width: 100%;
      height: 100%;
    }
  }

  &__spend {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid $accent;
    background: conic-gradient(
      $success v-bind(completed),
      transparent v-bind(completed)
    );
  }

  &__assessment-time {
    font-size: 12px;
  }
  
}
</style>