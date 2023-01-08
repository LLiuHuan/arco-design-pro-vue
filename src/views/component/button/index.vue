<template>
  <div>
    <a-card title="按钮" class="h-full shadow-sm rounded-16px">
      <a-grid :cols="{ sm: 1, md: 2 }" :row-gap="16" :col-gap="16">
        <a-grid-item v-for="item in buttonExample" :key="item.id">
          <a-card :title="item.label" class="min-h-180px">
            <p v-if="item.desc" class="pb-16px">{{ item.desc }}</p>
            <a-space v-bind="item.space">
              <a-button
                v-for="button in item.buttons"
                :key="button.id"
                v-bind="button.props"
                :class="{ 'arco-btn-only-icon': button.icon && !button.label }"
              >
                <template v-if="button.icon" #icon>
                  <component :is="button.icon" />
                </template>
                {{ button.label }}
              </a-button>
            </a-space>
          </a-card>
        </a-grid-item>
        <a-grid-item>
          <a-card title="按钮组" class="min-h-180px">
            <a-space :direction="'vertical'">
              <a-button-group>
                <a-button>Publish</a-button>
                <a-button>
                  <template #icon>
                    <icon-down />
                  </template>
                </a-button>
              </a-button-group>
              <a-button-group>
                <a-button>Publish</a-button>
                <a-button>
                  <template #icon>
                    <icon-more />
                  </template>
                </a-button>
              </a-button-group>
              <a-button-group>
                <a-button type="primary">
                  <icon-left />
                  Prev
                </a-button>
                <a-button type="primary">
                  Next
                  <component :is="'icon-right'" />
                </a-button>
              </a-button-group>
            </a-space>
          </a-card>
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ButtonProps } from '@arco-design/web-vue/es/button';
  import { SpaceInstance } from '@arco-design/web-vue/es/space';

  interface SpaceProps {
    size?: SpaceInstance['size'];
    direction?: 'horizontal' | 'vertical';
    fill?: boolean;
    align?: 'start' | 'end' | 'center';
    wrap?: boolean;
  }
  interface ButtonDetail {
    id: number;
    props: ButtonProps & { href?: string; target?: string };
    label?: string;
    icon?: string;
  }

  interface ButtonExample {
    id: number;
    label: string;
    buttons: ButtonDetail[];
    desc?: string;
    space?: SpaceProps;
  }

  const buttonExample: ButtonExample[] = [
    {
      id: 0,
      label: '基础按钮',
      buttons: [
        {
          id: 0,
          props: {
            type: 'primary',
          },
          label: '主要按钮',
        },
        {
          id: 1,
          props: {
            type: 'secondary',
          },
          label: '次要按钮',
        },
        {
          id: 2,
          props: {
            type: 'dashed',
          },
          label: '虚线按钮',
        },
        {
          id: 3,
          props: {
            type: 'outline',
          },
          label: '线形按钮',
        },
        {
          id: 4,
          props: {
            type: 'text',
          },
          label: '文字按钮',
        },
      ],
      desc: '按钮有五种类型：主要按钮、次要按钮、虚线按钮、线形按钮、文字按钮。',
    },
    {
      id: 1,
      label: '图标按钮',
      buttons: [
        {
          id: 0,
          props: {
            type: 'primary',
          },
          icon: 'icon-plus',
        },
        {
          id: 1,
          props: {
            type: 'primary',
          },
          icon: 'icon-delete',
          label: 'Delete',
        },
      ],
    },
    {
      id: 2,
      label: '按钮形状',
      buttons: [
        {
          id: 0,
          props: {
            type: 'primary',
          },
          label: 'Square',
        },
        {
          id: 1,
          props: {
            type: 'primary',
            shape: 'round',
          },
          label: 'Round',
        },
        {
          id: 2,
          props: {
            type: 'primary',
          },
          icon: 'icon-plus',
        },
        {
          id: 3,
          props: {
            type: 'primary',
            shape: 'circle',
          },
          icon: 'icon-plus',
        },
      ],
    },
    {
      id: 3,
      label: '按钮尺寸',
      buttons: [
        {
          id: 0,
          props: {
            type: 'primary',
            size: 'mini',
          },
          label: 'Mini',
        },
        {
          id: 1,
          props: {
            type: 'primary',
            size: 'small',
          },
          label: 'Small',
        },
        {
          id: 2,
          props: {
            type: 'primary',
          },
          label: 'Medium',
        },
        {
          id: 3,
          props: {
            type: 'primary',
            size: 'large',
          },
          label: 'Large',
        },
      ],
    },
    {
      id: 4,
      label: '按钮状态',
      buttons: [
        {
          id: 0,
          props: {
            type: 'primary',
            status: 'success',
          },
          label: 'Success',
        },
        {
          id: 1,
          props: {
            type: 'primary',
            status: 'warning',
          },
          label: 'Warning',
        },
        {
          id: 2,
          props: {
            type: 'primary',
            status: 'danger',
          },
          label: 'Danger',
        },
        {
          id: 3,
          props: {
            type: 'primary',
            status: 'normal',
          },
          label: 'Normal',
        },
      ],
    },
    {
      id: 5,
      label: '按钮禁用',
      buttons: [
        {
          id: 0,
          props: {
            type: 'primary',
            disabled: true,
          },
          label: 'Primary',
        },
        {
          id: 1,
          props: {
            type: 'secondary',
            disabled: true,
          },
          label: 'Secondary',
        },
        {
          id: 2,
          props: {
            type: 'dashed',
            disabled: true,
          },
          label: 'Dashed',
        },
        {
          id: 3,
          props: {
            type: 'outline',
            disabled: true,
          },
          label: 'Outline',
        },
        {
          id: 4,
          props: {
            type: 'text',
            disabled: true,
          },
          label: 'Text',
        },
      ],
    },
    {
      id: 6,
      label: '按钮加载中',
      buttons: [
        {
          id: 0,
          props: {
            type: 'primary',
            loading: true,
          },
          label: 'Primary',
        },
        {
          id: 1,
          props: {
            type: 'secondary',
            loading: true,
          },
          label: 'Secondary',
        },
        {
          id: 2,
          props: {
            type: 'dashed',
            loading: true,
          },
          label: 'Dashed',
        },
        {
          id: 3,
          props: {
            type: 'outline',
            loading: true,
          },
          label: 'Outline',
        },
        {
          id: 4,
          props: {
            type: 'text',
            loading: true,
          },
          label: 'Text',
        },
      ],
      space: {
        direction: 'vertical',
        size: 'small',
      },
    },
    {
      id: 7,
      label: '长按钮',
      buttons: [
        {
          id: 0,
          props: {
            type: 'primary',
            long: true,
          },
          label: 'Primary',
        },
        {
          id: 1,
          props: {
            type: 'secondary',
            long: true,
          },
          label: 'Secondary',
        },
        {
          id: 2,
          props: {
            type: 'dashed',
            long: true,
          },
          label: 'Dashed',
        },
        {
          id: 3,
          props: {
            type: 'outline',
            long: true,
          },
          label: 'Outline',
        },
        {
          id: 4,
          props: {
            type: 'text',
            long: true,
          },
          label: 'Text',
        },
      ],
      space: {
        direction: 'vertical',
        fill: true,
        size: 'small',
      },
    },
  ];
</script>

<style lang="less" scoped></style>
