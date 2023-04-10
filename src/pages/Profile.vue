<script lang="ts">
import User from "@/models/response/User";
import { defineComponent, PropType } from "vue";

import VImage from "@/components/common/VImage.vue";
import VIcon from "@/components/common/VIcon.vue";
import VInput from "@/components/common/VInput.vue";
import VButton from "@/components/common/VButton.vue";

import userController from "@/controllers/userController";
import { refreshToken } from "@/interceptors/token-refresher";

export default defineComponent({
  components: {
    VImage,
    VIcon,
    VInput,
    VButton
  },

  props: {
    user: { type: Object as PropType<User>, default: {}}
  },

  data() {
    return {
      localUser: {} as unknown as User,
      passwords: {
        new: '',
        old: '',
        newRep: ''
      }
    }
  },

  methods: {
    async selectFile(event: Event) {
      const file = (event.target as any).files[0] as File
      await userController.uploadAvatar(file)
      this.$emit('refresh')
    },

    async changeUserData() {
      const { login, first_name, second_name } = this.localUser
      if (login.length < 5 || first_name.length < 3 || second_name.length < 3) return
      await userController.changeData(login, first_name, second_name)
    },

    async changePassword() {
      const { old: oldPassword, new: newPassword, newRep: newPasswordRepeat } = this.passwords
      if (newPassword !== newPasswordRepeat || oldPassword === newPassword) return
      await userController.changePassword(newPassword, oldPassword)
    },

    async refreshToken() {
      this.$emit('refresh')
    }
  },

  watch: {
    user: {
      handler() {
        this.localUser = {...this.user}
      },
      deep: true,
      immediate: true
    }
  }
})
</script>

<template>
  <div class="profile">
    <div class="profile__left-side">
      <div class="profile__avatar-change">
        <label class="profile__avatar-hover">
          <input @change="selectFile" class="profile__avatar-input" type="file">
          <v-icon class="profile__avatar-hover-icon" size="72" name="uploadIcon"/>
        </label>
        <v-image class="profile__avatar" :path="localUser.avatar"/>
      </div>
      <div class="profile__change-password">
        <div class="profile__change-password-title">Сменить пароль</div>
        <v-input placeholder="Старый пароль" v-model="passwords.old"/>
        <v-input placeholder="Новый пароль" v-model="passwords.new"/>
        <v-input placeholder="Повторите новый пароль" v-model="passwords.newRep"/>
        <v-button @click="changePassword">Обновить пароль</v-button>
      </div>
    </div>
    <hr class="profile__divider"/>
    <div class="profile__right-side">
      <div class="profile__user-title">Информация о профиле</div>
      <v-input placeholder="Логин" v-model="localUser.login"/>
      <v-input placeholder="Имя" v-model="localUser.first_name"/>
      <v-input placeholder="Фамилия" v-model="localUser.second_name"/>
      <v-button @click="changeUserData">Сохранить</v-button>
    </div>
  </div>
</template>

<style lang="scss">
.profile {
  padding: 32px;
  display: flex;

  height: 100%;


  &__divider {
    margin: 0 24px;
    opacity: 0.05;
  }

  &__avatar {
    height: 250px !important;
    width: 250px !important;

    &-input {
      display: none;
    }

    &-hover {
      position: absolute;
      height: 250px;
      width: 250px;
      border-radius: 1000px;
      transition-duration: 300ms;
      transition-property: background;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      &:hover{
        background-color: rgba($black, 0.4);
      }

      &:hover &-icon {
        opacity: 1;
      }

      &-icon {
        color: $grey-400;
        transition-duration: 300ms;
        transition-property: opacity;
        opacity: 0;
      }
    }
  }

  &__left-side {
    display: flex;
    flex-direction: column;

    gap: 48px;

    width: 40%;
  }

  &__right-side {
    display: flex;
    flex-direction: column;

    justify-content: center;

    gap: 48px;

    width: 60%;
  }

  &__change-password {
    display: flex;
    flex-direction: column;

    gap: 16px;

    &-title {
      font-size: 36px;
    }
  }

  &__user {
    &-title {
      font-size: 44px;
      text-align: center;
    }


  }
}
</style>
