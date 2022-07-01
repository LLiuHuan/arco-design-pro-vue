import type { FunctionalComponent, defineComponent } from 'vue';
import { h } from 'vue';
import { Popover } from '@arco-design/web-vue';
import { componentMap } from '@/components/BasicTable/src/componentMap';
import type { ComponentType } from '../../types/componentType';

export interface ComponentProps {
  component: ComponentType;
  rule: boolean;
  popoverVisible: boolean;
  ruleMessage: string;
}

export const CellComponent: FunctionalComponent = (
  { component = 'Input', rule = true, ruleMessage, popoverVisible }: ComponentProps,
  { attrs }
) => {
  const Comp = componentMap.get(component) as typeof defineComponent;
  const DefaultComp = h(Comp, attrs);
  if (!rule) {
    return DefaultComp;
  }
  return DefaultComp;
  return h(
    Popover,
    {
      'display-directive': 'show',
      show: !!popoverVisible,
      manual: 'manual',
      content: ruleMessage || '请输入正确的值',
    },
    [DefaultComp]
  );
};
