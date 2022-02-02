import { AppRouteRecordRaw } from '@/router/types';
import { ErrorPage, Layout, RedirectName } from '@/router/constant';

export const RedirectRoute: AppRouteRecordRaw = {
  path: '/redirect',
  name: RedirectName,
  component: Layout,
  meta: {
    title: RedirectName,
    hideBreadcrumb: true,
    hidden: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true,
      },
    },
  ],
};

// 404 on a page
export const ErrorPageRoute: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'errors',
  component: Layout,
  meta: {
    title: 'errors',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'errors.404',
      component: ErrorPage,
      meta: {
        title: 'errors.404',
        hideBreadcrumb: true,
      },
    },
  ],
};

export const Error: AppRouteRecordRaw = {
  path: '/500',
  name: 'errors',
  component: ErrorPage,
  meta: {
    title: 'errors',
    hideBreadcrumb: true,
  },
};
