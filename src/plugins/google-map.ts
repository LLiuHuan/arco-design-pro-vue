import { App } from 'vue';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import { GOOGLE_KEY } from '@/config';

export function setupGoogleMap(app: App) {
  app.use(VueGoogleMaps, {
    load: {
      key: GOOGLE_KEY,
    },
  });
}
