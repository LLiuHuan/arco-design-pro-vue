import './styles/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import { setupArco } from './plugins/arco-design';
import '@arco-design/web-vue/dist/arco.css';
import { setupRouter } from '@/router';

const app = createApp(App);

// 初始化arco
setupArco(app);
setupRouter(app);

app.mount('#app');
