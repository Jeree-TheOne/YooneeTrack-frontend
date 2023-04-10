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
      email: '',
      password: '',
      passwordRepeat: '',
    }
  },

  methods: {
    focusInput(ref: string) {
      this.$nextTick(() => {
        (this.$refs[ref] as DefineComponent<typeof VInput>).focus()
      })
    },

    registration() {
      authService.registration(this.email, this.password).then(() => {
        this.$router.push({path: '/login'})
      })
    }
  },

  mounted() {
    this.$nextTick(() => {
      (this.$refs['email'] as DefineComponent<typeof VInput>).focus()
    })
  }
})
</script>

<template>
  <div class="registration-page">
    <div class="registration-page__form">
      <span class="registration-page__title">Регистрация</span>
      <v-input v-model="email" class="registration-page__input" ref="email" @keyup.enter="focusInput('password')" placeholder="Почта"/>
      <v-input v-model="password" class="registration-page__input" ref="password" @keyup.enter.stop="focusInput('passwordRepeat')" placeholder="Пароль" type="password"/>
      <v-input v-model="passwordRepeat" class="registration-page__input" ref="passwordRepeat" @keyup.enter.stop="registration" placeholder="Повторите пароль" type="password"/>
      <div class="registration-page__button-panel">
        <v-button class="registration-page__registration-button" @click="registration">Зарегистрироваться</v-button>
        <v-button href="../login">Авторизоваться</v-button>
      </div>
    </div>
    <auth-info/>
  </div>
</template>

<style lang="scss">
.registration-page {
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

  &__registration-button {
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
