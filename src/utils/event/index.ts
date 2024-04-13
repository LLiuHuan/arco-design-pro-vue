export const triggerWindowResize = () => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, true);
  (event as any).eventType = 'message';
  window.dispatchEvent(event);

  // const ev = new Event('resize', { bubbles: true, cancelable: true });
  // window.dispatchEvent(ev);
};
