export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string;
    noopener?: boolean;
    noreferrer?: boolean;
  },
) {
  const feature: string[] = [];

  if (opt?.noopener) {
    feature.push('noopener=yes');
  }
  if (opt?.noreferrer) {
    feature.push('noreferrer=yes');
  }

  window.open(url, opt?.target, feature.join(','));
}

export function open(url: string) {
  window.location.href = url;
}
