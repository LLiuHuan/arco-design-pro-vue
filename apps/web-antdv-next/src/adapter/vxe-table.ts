/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2026-02-19 01:29:54
 * @LastEditTime: 2026-02-19 01:39:36
 * @LastEditors: LLiuHuan
 */
import type { VxeTableGridOptions } from '@qin/plugins/vxe-table';

import { h } from 'vue';

import { setupQinVxeTable, useQinVxeGrid } from '@qin/plugins/vxe-table';

import { Button, Image } from 'antdv-next';

import { useQinForm } from './form';

setupQinVxeTable({
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
      renderTableDefault(renderOpts, params) {
        const { props } = renderOpts;
        const { column, row } = params;
        return h(Image, { src: row[column.field], ...props });
      },
    });

    // 表格配置项可以用 cellRender: { name: 'CellLink' },
    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts;
        return h(
          Button,
          { size: 'small', type: 'link' },
          { default: () => props?.text },
        );
      },
    });

    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
  },
  useQinForm,
});

export { useQinVxeGrid };

export type * from '@qin/plugins/vxe-table';
