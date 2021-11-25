import { createApp } from 'vue';
import App from './App.vue';
import { setupArco } from './plugins/arco-design';
import '@arco-design/web-vue/dist/arco.css';
import { setupRouter } from '@/router';
import { setupI18n } from '@/plugins/i18n';
import 'virtual:windi.css';

const app = createApp(App);

// 初始化arco
setupArco(app);
setupRouter(app);
setupI18n(app);

app.mount('#app');
