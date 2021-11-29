import { store as settings, SettingStore, State as SettingState } from './modules/settings';
import { store as tabs, TabsStore, State as TabsState } from './modules/tabs';
import { createStore } from 'vuex';
import { App } from 'vue';

export type RootState = {
  settings: SettingState;
  tabs: TabsState;
};

export type Store = SettingStore<Pick<RootState, 'settings'>> & TabsStore<Pick<RootState, 'tabs'>>;

const store = createStore<RootState>({
  modules: {
    settings,
    tabs,
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
