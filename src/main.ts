/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import App from '@/App.vue';
import PrimeVue from 'primevue/config';

//theme
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.scss';
import '@/assets/app.scss';

import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue, {
  ripple: true
});

app.component('Button', Button);
app.component('SelectButton', SelectButton);
app.component('Toast', Toast);
app.use(ToastService);

app.mount('#app');
