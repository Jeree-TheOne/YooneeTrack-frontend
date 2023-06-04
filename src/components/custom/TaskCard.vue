<script lang="ts">
import Tag from "@/models/Tag";

import VTag from "../common/VTag.vue";
import VImage from "../common/VImage.vue";
import VIcon from "../common/VIcon.vue";

import { defineComponent, PropType, StyleValue } from "vue";
import { capitalizeFirstLetter, fromNumberToTime, fromTimeToNumber } from "@/utils/formatters";
import TaskAll from "@/models/response/TaskAll";
import Member from "@/models/Member";
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

    members() {
      return this.$attrs.members as Member[]
    },

    performer() {
      return this.members.find(member => member.id == this.task.performerId)
    },

    completed() {
      if (!this.task.initialAssessment || Number(this.task.initialAssessment) < this.task.spentTime) return '0%'
      return (this.task.spentTime / this.task.initialAssessment * 100) + '%'
    },

    assessment() {
      if (!this.task.initialAssessment) return '?'
      return fromNumberToTime(this.task.initialAssessment)
    },

    styles(): StyleValue {
      if (!this.task.initialAssessment) return {}
      if (Number(this.task.initialAssessment) < this.task.spentTime)
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
      <div class="task-card__task-type">{{ task.taskType ? capitalizeFirstLetter(task.taskType) : '' }}</div>
      <v-tag class="task-card__tag" v-for="tag in taskTags" :color="tag.color" :background="tag.background">{{ capitalizeFirstLetter(tag.name) }}</v-tag>
    </div>
    <div class="task-card__body">
      {{ task.description && task.description !== 'null' ? task.description : 'Нет описания' }}
    </div>
    <div class="task-card__footer">
      <div class="task-card__performer">
        <v-image class="task-card__performer-avatar" v-if="performer" :path="performer.avatar"/>
        <v-icon v-else size="24" name="questionMarkIcon"/>
        <div v-if="performer">{{ performer?.email }}</div>
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
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  cursor: pointer;

  @include set-prop-states-values(background-color, $grey-300, $grey-500);

  &__header {
    display: flex;
    flex-wrap: wrap;
    gap: 2px 12px;
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