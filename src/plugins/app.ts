import { Button, Notification, Space } from '@arco-design/web-vue';
import { h } from 'vue';
import { useI18n } from '@/hooks/web/useI18n';

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
    console.log(buildTime, BUILD_TIME);
    if (buildTime === BUILD_TIME) {
      return;
    }

    isShow = true;

    Notification.info({
      id: `${BUILD_TIME}`,
      title: t('system.updateTitle'),
      content: t('system.updateContent'),
      duration: 0,
      footer: () => {
        return h(Space, [
          h(
            Button,
            {
              onClick() {
                console.log(`${BUILD_TIME}`);
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

async function getHtmlBuildTime() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const res = await fetch(`${baseURL}index.html`);

  const html = await res.text();

  const match = html.match(
    /<meta name="buildTime" content="(\d{4}[\/\-]\d{2}[\/\-]\d{2} \d{2}:\d{2}:\d{2})">/,
  );

  const buildTime = match?.[1] || '';

  return buildTime;
}
