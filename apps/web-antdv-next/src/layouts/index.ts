/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2026-02-19 01:29:54
 * @LastEditTime: 2026-02-19 01:41:26
 * @LastEditors: LLiuHuan
 */
const BasicLayout = () => import('./basic.vue');
const AuthPageLayout = () => import('./auth.vue');

const IFrameView = () => import('@qin/layouts').then((m) => m.IFrameView);

export { AuthPageLayout, BasicLayout, IFrameView };
