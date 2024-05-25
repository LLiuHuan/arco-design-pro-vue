import componentSetting from '@/settings/componentSetting';

const { table } = componentSetting;

//  Default layout of table cells
export const DEFAULT_ALIGN = 'center';

export const INDEX_COLUMN_FLAG = 'INDEX';

export const ACTION_COLUMN_FLAG = 'ACTION';

const { defaultPageSize, defaultCurrent, defaultSize, pageSizeOptions } = table;

export const DEFAULT_CURRENT = defaultCurrent;

export const DEFAULT_PAGE_SIZE = defaultPageSize;

export const DEFAULT_PAGE_SIZE_OPTIONS = pageSizeOptions;

export const DEFAULT_SIZE = defaultSize;
