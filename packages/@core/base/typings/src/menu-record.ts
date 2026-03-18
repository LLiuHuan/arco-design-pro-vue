/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-16 12:18:03
 * @LastEditTime: 2026-03-18 10:42:43
 * @LastEditors: LLiuHuan
 */
import type { Recordable } from './helper';
import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

/**
 * 扩展路由原始对象
 */
type ExRouteRecordRaw = RouteRecordRaw & {
  parent?: string;
  parents?: string[];
  path?: any;
};

interface MenuRecordBadgeRaw {
  /**
   * 徽标
   */
  badge?: string;
  /**
   * 徽标类型
   */
  badgeType?: 'dot' | 'normal';
  /**
   * 徽标颜色
   */
  badgeVariants?: 'destructive' | 'primary' | string;
}

/**
 * 菜单原始对象
 */
interface MenuRecordRaw extends MenuRecordBadgeRaw {
  /**
   * 激活时的图标名
   */
  activeIcon?: string;
  /**
   * 子菜单
   */
  children?: MenuRecordRaw[];
  /**
   * 是否禁用菜单
   * @default false
   */
  disabled?: boolean;
  /**
   * 图标名
   */
  icon?: Component | string;
  /**
   * 菜单名
   */
  name: string;
  /**
   * 排序号
   */
  order?: number;
  /**
   * 父级路径
   */
  parent?: string;
  /**
   * 所有父级路径
   */
  parents?: string[];
  /**
   * 菜单路径，唯一，可当作key
   */
  path: string;
  /**
   * 菜单参数
   */
  query?: Recordable<any>;
  /**
   * 是否显示菜单
   * @default true
   */
  show?: boolean;
}

export type { ExRouteRecordRaw, MenuRecordBadgeRaw, MenuRecordRaw };
