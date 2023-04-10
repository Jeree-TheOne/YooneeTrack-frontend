<script lang="ts">
import { defineComponent } from "vue";
import VCard from "@/components/common/VCard.vue";
import VIcon from "@/components/common/VIcon.vue";
import AuthBackground from "./AuthBackground.vue";

export default defineComponent({
  components: {
    AuthBackground,
    VCard,
    VIcon
  }
})
</script>

<template>
  <div class="auth">
    <auth-background class="auth__background"/>
    <v-card class="auth__info">
      <div class="auth__title">
        <v-icon size="40" name="logoIcon" class="auth__icon"/>
        YooneeTrack
      </div>
      Лучшее приложение для отслеживания собственных задач
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  padding: 0;
  border-radius: 0;
  overflow: hidden;
  height: 100vh;
  width: 45%;
  position: relative;

  background-color: $grey-100;

  &__background {
    width: 100%;
  }

  &__info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: linear-gradient(152.97deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
    backdrop-filter: blur(21px);
    -webkit-backdrop-filter: blur(21px);

    border-radius: 16px;
    padding: 53px 36px;

    width: 60%;
    height: 47%;

    display: flex;
    flex-direction: column;
    gap: 46px;

    font-size: 26px;
    font-weight: 700;
  }

  &__title {
    width: 100%;
    display: flex;
    gap: 8px;

    font-size: 32px;
    font-weight: 700;
  }

  &__icon {
    min-height: 41px;
    min-width: 36px;
  }
}
</style>
