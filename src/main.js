import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import BaseCard from './components/UI/BaseCard';
import BaseButton from './components/UI/BaseButton';
import BaseBadge from './components/UI/BaseBadge';
import BaseSpinner from './components/UI/BaseSpinner';

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);

app.use(router);
app.use(store);

app.mount('#app');
