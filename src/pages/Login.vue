<script lang="ts">
import VButton from "@/components/common/VButton.vue";
import VCard from "@/components/common/VCard.vue";
import VInput from "@/components/common/VInput.vue";
import AuthInfo from "@/components/custom/AuthInfo.vue";
import authService from "@/services/authService";
import { DefineComponent, defineComponent } from "vue";

export default defineComponent({
  components: {
    VCard,
    VInput,
    VButton,
    AuthInfo
  },

  data() {
    return {
      login: '',
      password: '',
    }
  },

  methods: {
    focusPassword() {
      this.$nextTick(() => {
        (this.$refs['password'] as DefineComponent<typeof VInput>).focus()
      })
    },

    auth() {
      authService.login(this.login, this.password).then(() => {
        this.$router.push({path: '/'})
      })
    }
  },

  mounted() {
    this.$nextTick(() => {
      (this.$refs['login'] as DefineComponent<typeof VInput>).focus()
    })
  },
})
</script>

<template>
  <div class="login-page">
    <auth-info/>
    <div class="login-page__form">
      <span class="login-page__title">Авторизация</span>
      <v-input v-model="login" class="login-page__input" ref="login" @keyup.enter="focusPassword" placeholder="Логин/Почта"/>
      <v-input v-model="password" class="login-page__input" ref="password" @keyup.enter.stop="auth" placeholder="Пароль" type="password"/>
      <div class="login-page__button-panel">
        <v-button class="login-page__login-button" @click="auth">Войти</v-button>
        <v-button href="../registration">Зарегистрироваться</v-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__form {
    height: 100%;
    width: 55%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 29px;
  }

  &__login-button {
    margin-top: 20px;
    width: 30%;
  }

  &__input {
    width: 50%;
  }

  &__button-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 16px;
  }

  &__title {
    font-size: 40px;
    font-weight: 700;

    margin-bottom: 20px;
  }
}
</style>
