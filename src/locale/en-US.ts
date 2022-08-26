// import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/base-view/login/components/PwdLogin/locale/en-US';
import localeAnalysis from '@/views/dashboard/analysis/locale/en-US';
import localeWorkbench from '@/views/dashboard/workbench/locale/en-US';
/** simple */
// import localeMonitor from '@/views/dashboard/monitor/locale/en-US';
//
// import localeSearchTable from '@/views/list/search-table/locale/en-US';
// import localeCardList from '@/views/list/card/locale/en-US';
//
// import localeStepForm from '@/views/form/step/locale/en-US';
// import localeGroupForm from '@/views/form/group/locale/en-US';
//
// import localeBasicProfile from '@/views/profile/basic/locale/en-US';
//
// import localeDataAnalysis from '@/views/visualization/data-analysis/locale/en-US';
// import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/en-US';
//
// import localeSuccess from '@/views/result/success/locale/en-US';
// import localeError from '@/views/result/error/locale/en-US';
import localeRoute from '@/router/locale/en-US';
import locale403 from '@/views/exception/403/locale/en-US';
import locale404 from '@/views/exception/404/locale/en-US';
import locale500 from '@/views/exception/500/locale/en-US';
//
// import localeUserInfo from '@/views/user/info/locale/en-US';
// import localeUserSetting from '@/views/user/setting/locale/en-US';
/** simple end */
import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  // ...localeMessageBox,
  ...localeLogin,
  ...localeAnalysis,
  ...localeWorkbench,
  /** simple */
  // ...localeMonitor,
  // ...localeSearchTable,
  // ...localeCardList,
  // ...localeStepForm,
  // ...localeGroupForm,
  // ...localeBasicProfile,
  // ...localeDataAnalysis,
  // ...localeMultiDAnalysis,
  // ...localeSuccess,
  // ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  // ...localeUserInfo,
  // ...localeUserSetting,
  ...localeRoute,
  /** simple end */
};
