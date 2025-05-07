/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-08-16 01:32:01
 * @LastEditTime: 2024-08-23 19:22:37
 * @LastEditors: LLiuHuan
 */
import { Button, Notification, Space } from '@arco-design/web-vue';
import { h } from 'vue';
import { useI18n } from '@/hooks/web/useI18n';

async function getHtmlBuildTime() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await fetch(`${baseURL}index.html`);

  const html = await res.text();

  const match = html.match(
    /<meta name="buildTime" content="(\d{4}[-/]\d{2}[-/]\d{2} \d{2}:\d{2}:\d{2})">/,
  );

  const buildTime = match?.[1] || '';

  return buildTime;
}

export function setupAppVersionNotification() {
  let isShow = false;
  const { t } = useI18n();

  document.addEventListener('visibilitychange', async () => {
    const preConditions = [
      !isShow,
      document.visibilityState === 'visible',
      !import.meta.env.DEV,
    ];

    if (!preConditions.every(Boolean)) return;

    const buildTime = await getHtmlBuildTime();
    if (buildTime === BUILD_TIME) {
      return;
    }

    isShow = true;

    Notification.info({
      id: `${BUILD_TIME}`,
      title: t('system.updateTitle'),
      content: t('system.updateContent'),
      duration: 0,
      closable: true,
      footer: () => {
        return h(Space, [
          h(
            Button,
            {
              onClick() {
                Notification.remove(`${BUILD_TIME}`);
              },
            },
            () => t('system.updateCancel'),
          ),
          h(
            Button,
            {
              type: 'primary',
              onClick() {
                // 这里是刷新页面的逻辑，如果有更新，必须强制刷新一下页面才能生效

                // eslint-disable-next-line no-restricted-globals
                location.reload();
              },
            },
            () => t('system.updateConfirm'),
          ),
        ]);
      },
    });
  });
}
