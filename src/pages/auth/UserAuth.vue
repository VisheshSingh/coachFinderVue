<template>
  <base-card>
    <form @submit.prevent="handleSubmit">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!formIsValid" class="errors">
        Please enter valid email and password (must be at least 6 characters)
      </p>
      <div class="actions">
        <base-button>{{ buttonCaption }}</base-button>
        <base-button mode="flat" @click="switchMode">{{
          switchAuthModeCaption
        }}</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      mode: 'login',
      formIsValid: true
    };
  },
  computed: {
    buttonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchAuthModeCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    }
  },
  methods: {
    switchMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleSubmit() {
      this.formIsValid = true;
      if (this.email === '' || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }
    }
  }
};
</script>

<style scoped>
form {
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
