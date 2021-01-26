<template>
  <base-card>
    <h2>Coach Registration</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-control" :class="{ invalid: !firstname.isValid }">
        <label for="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          v-model.trim="firstname.val"
          @blur="clearValidity('firstname')"
        />
        <p v-if="!firstname.isValid">First Name cannot be blank</p>
      </div>
      <div class="form-control" :class="{ invalid: !lastname.isValid }">
        <label for="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          v-model.trim="lastname.val"
          @blur="clearValidity('lastname')"
        />
        <p v-if="!lastname.isValid">Last Name cannot be blank</p>
      </div>
      <div class="form-control" :class="{ invalid: !description.isValid }">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model.trim="description.val"
          @blur="clearValidity('description')"
        ></textarea>
        <p v-if="!description.isValid">Description cannot be blank</p>
      </div>
      <div class="form-control" :class="{ invalid: !rate.isValid }">
        <label for="rate">Hourly Rate</label>
        <input
          type="number"
          id="rate"
          v-model.number="rate.val"
          @blur="clearValidity('rate')"
        />
        <p v-if="!rate.isValid">Please enter a valid hourly rate</p>
      </div>
      <h3>Area of expertise</h3>
      <p v-if="!areas.isValid">Please check at least one area of expertise</p>
      <div class="form-control" :class="{ invalid: !areas.isValid }">
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend</label>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend</label>

        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!formIsValid">
        Please carefully fill all the missing details to complete registration
      </p>
      <base-button>Register</base-button>
    </form>
  </base-card>
</template>

<script>
export default {
  emits: ['registration'],
  data() {
    return {
      firstname: {
        val: '',
        isValid: true
      },
      lastname: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    checkValidity() {
      this.formIsValid = true;

      if (this.firstname.val === '') {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastname.val === '') {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    handleSubmit() {
      this.checkValidity();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        firstName: this.firstname.val,
        lastName: this.lastname.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      };
      this.$emit('registration', formData);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
