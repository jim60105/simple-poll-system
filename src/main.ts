/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import App from '@/App.vue';
import PrimeVue from 'primevue/config';

// theme
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.scss';
import '@/assets/app.scss';

import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';

// components
import Form from '@/components/form/Form.vue';
import FormSelection from '@/components/form/FormSelection.vue';
import Result from '@/components/result/Result.vue';
import ResultChart from '@/components/result/ResultChart.vue';
import ResultList from '@/components/result/ResultList.vue';

import { APIService } from '@/services/APIService';

const app = createApp(App);
app.use(PrimeVue, {
  ripple: true
});

const apiService = new APIService();
app.provide('APIService', apiService);

app.component('Button', Button);
app.component('SelectButton', SelectButton);
app.component('Toast', Toast);
app.use(ToastService);
app.component('Chart', Chart);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);

app.component('Form', Form);
app.component('FormSelection', FormSelection);
app.component('Result', Result);
app.component('ResultChart', ResultChart);
app.component('ResultList', ResultList);

app.mount('#app');
