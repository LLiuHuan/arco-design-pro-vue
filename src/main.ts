import { createApp } from 'vue';
import App from './App.vue';
import { setupArco } from './plugins/arco-design';
import '@arco-design/web-vue/dist/arco.css';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupMarkDown } from '@/plugins/v-md-editor';
import { setupPermission } from '@/plugins/permission';
import 'virtual:windi.css';
import { setupTheme } from '@/plugins/theme';
import { setupI18n } from '@/plugins/i18n';

const app = createApp(App);

// 初始化arco
setupArco(app);
setupStore(app);
setupMarkDown(app);
setupPermission(app);
setupRouter(app);
setupTheme();
setupI18n(app);

app.mount('#app');
