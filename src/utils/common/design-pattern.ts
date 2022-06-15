/** 执行策略模式 */
import { Common } from '@/typings/global';

export function exeStrategyActions(actions: Common.StrategyAction[]) {
  actions.some((item) => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}
