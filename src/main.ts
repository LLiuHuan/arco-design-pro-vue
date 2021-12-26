import { createApp } from 'vue';
import App from './App.vue';
import { setupArco } from './plugins/arco-design';
// import '@arco-design/web-vue/dist/arco.css';
import { setupRouter } from '@/router';
import { setupI18n } from '@/plugins/i18n';
import { setupStore } from '@/store';
import { setupMarkDown } from '@/plugins/v-md-editor';
import { setupPermission } from '@/plugins/permission';
import 'virtual:windi.css';
import { setupTheme } from '@/plugins/theme';

const app = createApp(App);

// 初始化arco
setupArco(app);
setupStore(app);
setupI18n(app);
setupMarkDown(app);
setupPermission(app);
setupRouter(app);
setupTheme();

app.mount('#app');
