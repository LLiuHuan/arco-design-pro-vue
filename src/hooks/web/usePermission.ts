export function usePermission() {
  // const userStore = useUserStore();
  const roles = ['job:add', 'job:edit'];

  /**
   * 检查权限
   * @param accesses
   */
  function _somePermissions(accesses: string[]) {
    // return userStore.getPermissions.some((item) => {
    return roles.some((item) => {
      const { value }: any = item;
      return accesses.includes(value);
    });
  }

  /**
   * 判断是否存在权限
   * 可用于 v-if 显示逻辑
   * */
  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length) return true;
    return _somePermissions(accesses);
  }

  return { hasPermission };
}
