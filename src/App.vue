<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader';
export default {
  components: { TheHeader }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;700&display=swap');
* {
  box-sizing: border-box;
}

html {
  font-family: 'Quicksand', sans-serif;
}

body {
  margin: 0;
}
</style>
