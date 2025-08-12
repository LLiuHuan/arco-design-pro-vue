/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-06-17 01:26:52
 * @LastEditTime: 2025-07-15 02:18:49
 * @LastEditors: LLiuHuan
 */
import type { VxeTableGridOptions } from '@arco/plugins/vxe-table';

import { h } from 'vue';

import { setupArcoVxeTable, useArcoVxeGrid } from '@arco/plugins/vxe-table';

import { NButton, NImage } from 'naive-ui';

import { useArcoForm } from './form';

setupArcoVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: false,
        columnConfig: {
          resizable: true,
        },
        minHeight: 180,
        formConfig: {
          // 全局禁用vxe-table的表单配置，使用formOptions
          enabled: false,
        },
        proxyConfig: {
          autoLoad: true,
          response: {
            result: 'items',
            total: 'total',
            list: 'items',
          },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: true,
        showOverflow: true,
        size: 'small',
      } as VxeTableGridOptions,
    });

    // 表格配置项可以用 cellRender: { name: 'CellImage' },
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params;
        return h(NImage, { src: row[column.field] });
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellLink' },
    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts;
        return h(
          NButton,
          { size: 'small', type: 'primary', quaternary: true },
          { default: () => props?.text },
        );
      },
    });

    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
  },
  useArcoForm,
});

export { useArcoVxeGrid };

export type * from '@arco/plugins/vxe-table';
