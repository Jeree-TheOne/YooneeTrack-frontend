<script lang="ts">
import { defineComponent, PropType } from "vue";

import VButton from "@/components/common/VButton.vue";
import VMenu from "@/components/common/VMenu.vue";
import VImage from "@/components/common/VImage.vue";
import VIcon from "@/components/common/VIcon.vue";
import CreateWorkspaceModal from "@/components/modals/CreateWorkspace.vue";

import User from "@/models/response/User";
import authService from "@/services/authService";

export default defineComponent({
  components: {
    VButton,
    VImage,
    VMenu,
    VIcon,
    CreateWorkspaceModal
  },

  props: {
    user: { type: Object as PropType<User>, default: {}}
  },

  data() {
    return {
      isCreateModalOpen: false
    }
  },

  methods: {
    profile() {
      this.$router.push('/profile')
    },

    logout() {
      authService.logout().then(() => {
        this.$router.push('/login')
      })
    },

    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen
    },

    goToWorkspaces() {
      this.$router.replace({name: 'Workspaces'})
    }
  },
})
</script>

<template>
  <div class="the-header">
    <div class="the-header__header">
      <div @click="goToWorkspaces" class="the-header__logo">
      <v-icon size="36" name="logoIcon" class="auth__icon"/>
      YooneeTrack
      </div>
      <div class="the-header__user">
        <v-menu right card-class="the-header__user-card" card-wrapper-class="the-header__user-card-wrapper">
          <template #activator="{ attrs }">
            <v-button text class="the-header__profile" v-bind="attrs" @click="attrs.click">
              <v-image class="the-header__avatar" :path="user.avatar"/>
              <div class="the-header__name">{{ user.login || `${user.first_name} ${user.second_name}` || user.email }}</div>
            </v-button>
          </template>
          <div class="the-header__profile-options">
            <v-button class="the-header__profile-option" text @click="profile">Профиль</v-button>
            <v-button class="the-header__profile-option" text @click="toggleCreateModal">Создать рабочее пространство</v-button>
            <v-button class="the-header__profile-option" text @click="logout">Выйти</v-button>
          </div>
        </v-menu>
      </div>
    </div>
    <hr class="the-header__divider"/>
    <create-workspace-modal @close="toggleCreateModal" :show="isCreateModalOpen"/>
  </div>
</template>

<style lang="scss">
.the-header {
  width: 100%;

  display: flex;
  flex-direction: column;


  &__divider {
    opacity: 0.05;
  }

  &__header {
    padding: 0 16px;

    display: flex;
    justify-items: space-between;
    align-items: center;

    min-height: 80px;
  }

  &__logo {
    cursor: pointer;
    width: 100%;
    display: flex;
    gap: 8px;

    font-size: 30px;
    font-weight: 700;
  }

  &__user {
    margin-left: auto;

    &-card {
      background-color: $grey-400 !important;
      &-wrapper {
        margin-top: 8px;
      }
    }
  }

  &__profile {
    display: flex;
    gap: 16px;
    min-width: 150px;
    max-width: 250px;
    height: 60px;

    align-items: center;

    &-options {
      white-space: nowrap;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;

      align-items: start;
      justify-content: start;
    }

    &-option {
      width: 100%;
      text-align: start;
    }
  }

  &__avatar {
    height: 50px !important;
    width: 50px !important;
  }

  &__name {
    max-width: 170px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    @include set-prop-states-values(color, $white)
  }
}
</style>
