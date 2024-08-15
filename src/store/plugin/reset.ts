import { PiniaPluginContext } from 'pinia';
import { StoreEnum } from '@/enums';
import { cloneDeep } from 'lodash-es';

/**
 * The plugin reset the state of the store which is written by setup syntax
 *
 * @param context
 */
export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(StoreEnum) as string[];

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;

    // const defaultStore = jsonClone($state);
    const defaultStore = cloneDeep($state);

    context.store.$reset = () => {
      context.store.$patch(defaultStore);
    };
  }
}
