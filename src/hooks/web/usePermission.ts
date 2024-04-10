export function usePermission() {
  // TODO:
  const hasPermission = (value: string) => {
    return value === 'admin';
  };
  return {
    hasPermission,
  };
}
