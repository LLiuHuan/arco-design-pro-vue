import { ProjectConfig } from '~/types/config';
import { CacheTypeEnum } from '@/enums';

const setting: ProjectConfig = {
  // Permission-related cache is stored in sessionStorage or localStorage - [权限相关缓存存储在sessionStorage还是localStorage中]
  permissionCacheType: CacheTypeEnum.LOCAL,
  // Use error-handler-plugin - [显示错误处理插件]
  useErrorHandle: false,
};

export default setting;
