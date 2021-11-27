import { store as settings, SettingStore, State as SettingState } from './modules/settings';
import { createStore } from 'vuex';
import { App } from 'vue';

export type RootState = {
  settings: SettingState;
};

export type Store = SettingStore<Pick<RootState, 'settings'>>;

const store = createStore<RootState>({
  modules: {
    settings,
  },
  // strict: process.env.NODE_ENV !== 'production',
});

export function useStore(): Store {
  return store as Store;
}

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
