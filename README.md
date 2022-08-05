
<p align="center">
  <img width="55" src="http://qiniu.54cc.cc/uPic/logo-202208051629311659688171.png">
</p>

<p align="center">
<a href="https://www.oscs1024.com/project/oscs/LLiuHuan/arco-design-pro-vue?ref=badge_small" alt="OSCS Status"><img src="https://www.oscs1024.com/platform/badge/LLiuHuan/arco-design-pro-vue.svg?size=small"/></a>
  <a href="https://github.com/LLiuHuan/arco-design-pro-vue"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg?sanitize=true" alt="Build Status"></a>
  <a href="https://github.com/LLiuHuan/arco-design-pro-vue/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"></a>
</p>


> 技术不好，也没啥时间，随便写写，对付看吧，喜欢的话可以点个 Start

## 1. 基本介绍

### 1.1 项目介绍

> 原本是打算实现 arco-design-pro 的vue版本，但是看官方说21年12月份就会推出vue版本的，所以这个项目就不会完全照搬 arco-design-pro 了

在线预览
：[https://lliuhuan.github.io/arco-design-pro-vue](https://lliuhuan.github.io/arco-design-pro-vue)  

### 1.2 目录结构
```
├── CHANGELOG.md
├── LICENSE
├── README.md
├── build
│ ├── config
│ │ ├── build.ts
│ │ ├── define.ts
│ │ ├── index.ts
│ │ └── proxy.ts
│ ├── index.ts
│ └── plugin
│     ├── compress.ts
│     ├── html.ts
│     ├── index.ts
│     ├── mock.ts
│     ├── prismjs.ts
│     ├── unocss.ts
│     ├── unplugin.ts
│     ├── visualizer.ts
│     └── vue.ts
├── changelog-option.js
├── commitlint.config.js
├── dist
├── index.html
├── mock
│ ├── api
│ │ ├── auth.ts
│ │ ├── index.ts
│ │ └── route.ts
│ ├── index.ts
│ └── model
│     ├── auth.ts
│     ├── index.ts
│     └── route.ts
├── package.json
├── prettier.config.js
├── public
│ └── favicon.ico
├── src
│ ├── App.vue
│ ├── api
│ │ ├── index.ts
│ │ ├── system
│ │ │ └── github.ts
│ │ └── user
│ │     ├── auth.ts
│ │     ├── demo.ts
│ │     ├── index.ts
│ │     └── user.ts
│ ├── assets
│ │ ├── images
│ │ │ ├── dashboard.png
│ │ │ ├── login-banner.png
│ │ │ └── schoolboy.png
│ │ ├── logo.png
│ │ ├── logo_bak.png
│ │ ├── noBody.png
│ │ ├── styles
│ │ │ ├── breakpoint.less
│ │ │ ├── common.less
│ │ │ ├── css
│ │ │ │ ├── global.css
│ │ │ │ ├── reset.css
│ │ │ │ ├── scrollbar.css
│ │ │ │ └── transition.css
│ │ │ ├── echarts
│ │ │ │ └── dark.json
│ │ │ ├── global.less
│ │ │ ├── index.less
│ │ │ ├── less
│ │ │ ├── scss
│ │ │ │ ├── global.scss
│ │ │ │ └── scrollbar.scss
│ │ │ ├── theme
│ │ │ │ └── theme-christmas.less
│ │ │ ├── transition
│ │ │ │ ├── base.less
│ │ │ │ ├── fade.less
│ │ │ │ ├── index.less
│ │ │ │ ├── scale.less
│ │ │ │ ├── scroll.less
│ │ │ │ ├── slide.less
│ │ │ │ └── zoom.less
│ │ │ └── var.less
│ │ └── svg
│ │     ├── chrome.svg
│ │     ├── copy.svg
│ │     ├── logo-fill_bak.svg
│ │     ├── logo.svg
│ │     ├── logo_bak.svg
│ │     ├── logo_fill.svg
│ │     ├── network-error.svg
│ │     ├── no-permission.svg
│ │     ├── not-found.svg
│ │     └── service-error.svg
│ ├── components
│ │ ├── BasicForm
│ │ │ ├── index.ts
│ │ │ └── src
│ │ │     ├── BasicForm.vue
│ │ │     ├── helper.ts
│ │ │     ├── hooks
│ │ │     │ ├── useForm.ts
│ │ │     │ ├── useFormEvents.ts
│ │ │     │ └── useFormValues.ts
│ │ │     ├── props.ts
│ │ │     └── types
│ │ │         ├── form.ts
│ │ │         ├── grid.ts
│ │ │         ├── gridProps.d.ts
│ │ │         └── index.ts
│ │ ├── BasicTable
│ │ │ ├── index.ts
│ │ │ └── src
│ │ │     ├── componentMap.ts
│ │ │     ├── components
│ │ │     │ ├── TableAction.vue
│ │ │     │ ├── editable
│ │ │     │ │ ├── CellComponent.ts
│ │ │     │ │ ├── EditableCell.vue
│ │ │     │ │ ├── helper.ts
│ │ │     │ │ └── index.ts
│ │ │     │ └── settings
│ │ │     │     └── ColumnSetting.vue
│ │ │     ├── const.ts
│ │ │     ├── hooks
│ │ │     │ ├── useColumns.ts
│ │ │     │ ├── useDataSource.ts
│ │ │     │ ├── useLoading.ts
│ │ │     │ ├── usePagination.ts
│ │ │     │ └── useTableContext.ts
│ │ │     ├── index.vue
│ │ │     ├── props.ts
│ │ │     └── types
│ │ │         ├── componentType.ts
│ │ │         ├── pagination.ts
│ │ │         ├── table.ts
│ │ │         └── tableAction.ts
│ │ ├── common
│ │ │ ├── CodeEditor.vue
│ │ │ ├── DarkModeContainer.vue
│ │ │ ├── DarkModeSwitch.vue
│ │ │ ├── HoverContainer.vue
│ │ │ └── SystemLogo.vue
│ │ ├── custom
│ │ │ ├── GithubLink.vue
│ │ │ ├── IconSelect.vue
│ │ │ ├── SvgIcon.vue
│ │ │ └── WebSiteLink.vue
│ │ └── index.ts
│ ├── composables
│ │ ├── echarts.ts
│ │ ├── index.ts
│ │ ├── layout.ts
│ │ ├── router.ts
│ │ └── system.ts
│ ├── config
│ │ ├── index.ts
│ │ └── map-keys.ts
│ ├── directives
│ │ └── clickOutside.ts
│ ├── enums
│ │ ├── business.ts
│ │ ├── common.ts
│ │ ├── httpEnum.ts
│ │ ├── index.ts
│ │ ├── pageEnum.ts
│ │ ├── permissionsEnum.ts
│ │ └── system.ts
│ ├── hooks
│ │ ├── event
│ │ │ └── useWindowSizeFn.ts
│ │ ├── index.ts
│ │ ├── loading.ts
│ │ ├── locale.ts
│ │ ├── useBoolean.ts
│ │ └── web
│ │     ├── useI18n.ts
│ │     └── usePermission.ts
│ ├── layout
│ │ ├── BasicLayout
│ │ │ ├── components
│ │ │ │ ├── FooterBar
│ │ │ │ │ ├── index.ts
│ │ │ │ │ └── index.vue
│ │ │ │ ├── LoadingBar
│ │ │ │ │ ├── LoadingBar.d.ts
│ │ │ │ │ ├── index.ts
│ │ │ │ │ └── index.vue
│ │ │ │ ├── Logo
│ │ │ │ │ ├── index.ts
│ │ │ │ │ ├── index.vue
│ │ │ │ │ └── styles
│ │ │ │ │     ├── b0005044.svg
│ │ │ │ │     └── index.module.less
│ │ │ │ ├── MainView
│ │ │ │ │ ├── index.ts
│ │ │ │ │ └── index.vue
│ │ │ │ ├── MenuBox
│ │ │ │ │ ├── MenuItem.vue
│ │ │ │ │ ├── index.ts
│ │ │ │ │ └── index.vue
│ │ │ │ ├── MessageBox
│ │ │ │ │ ├── content.vue
│ │ │ │ │ ├── index.ts
│ │ │ │ │ ├── index.vue
│ │ │ │ │ ├── list.vue
│ │ │ │ │ └── styles
│ │ │ │ │     └── index.module.less
│ │ │ │ ├── NavBar
│ │ │ │ │ ├── index.ts
│ │ │ │ │ ├── index.vue
│ │ │ │ │ └── styles
│ │ │ │ │     └── index.module.less
│ │ │ │ ├── Settings
│ │ │ │ │ ├── index.ts
│ │ │ │ │ ├── index.vue
│ │ │ │ │ └── styles
│ │ │ │ │     ├── color.module.less
│ │ │ │ │     └── index.module.less
│ │ │ │ └── TagsView
│ │ │ │     ├── index.ts
│ │ │ │     ├── index.vue
│ │ │ │     └── styles
│ │ │ │         └── index.module.less
│ │ │ └── index.vue
│ │ ├── BlankLayout
│ │ │ └── index.vue
│ │ ├── common
│ │ │ ├── Content
│ │ │ │ ├── index.vue
│ │ │ │ └── styles
│ │ │ │     └── index.module.less
│ │ │ ├── Footer
│ │ │ │ └── index.vue
│ │ │ ├── Header
│ │ │ │ ├── components
│ │ │ │ │ ├── Breadcurmb.vue
│ │ │ │ │ ├── Fullscreen.vue
│ │ │ │ │ ├── Github.vue
│ │ │ │ │ ├── HeaderMenu.vue
│ │ │ │ │ ├── Locale.vue
│ │ │ │ │ ├── MenuCollapse.vue
│ │ │ │ │ ├── Setting
│ │ │ │ │ │ └── components
│ │ │ │ │ ├── Setting.vue
│ │ │ │ │ ├── ThemeMode.vue
│ │ │ │ │ ├── User.vue
│ │ │ │ │ └── index.ts
│ │ │ │ └── index.vue
│ │ │ ├── Logo
│ │ │ │ └── index.vue
│ │ │ ├── Menu
│ │ │ │ ├── SubMenu.vue
│ │ │ │ └── index.vue
│ │ │ ├── Setting
│ │ │ │ ├── components
│ │ │ │ │ ├── DarkMode
│ │ │ │ │ │ ├── index.vue
│ │ │ │ │ │ └── styles
│ │ │ │ │ │     ├── color.module.less
│ │ │ │ │ │     └── index.module.less
│ │ │ │ │ ├── LayoutMode
│ │ │ │ │ │ ├── components
│ │ │ │ │ │ │ ├── LayoutCheckbox.vue
│ │ │ │ │ │ │ └── index.ts
│ │ │ │ │ │ └── index.vue
│ │ │ │ │ ├── PageFunc
│ │ │ │ │ │ └── index.vue
│ │ │ │ │ ├── PageView
│ │ │ │ │ │ └── index.vue
│ │ │ │ │ ├── SettingMenu
│ │ │ │ │ │ └── index.vue
│ │ │ │ │ └── index.ts
│ │ │ │ └── index.vue
│ │ │ ├── Sider
│ │ │ │ ├── components
│ │ │ │ │ ├── VerticalMixSider
│ │ │ │ │ │ ├── components
│ │ │ │ │ │ │ ├── MixMenuCollapse.vue
│ │ │ │ │ │ │ ├── MixMenuDetail.vue
│ │ │ │ │ │ │ ├── MixMenuDrawer.vue
│ │ │ │ │ │ │ └── index.ts
│ │ │ │ │ │ └── index.vue
│ │ │ │ │ ├── VerticalSider
│ │ │ │ │ │ ├── components
│ │ │ │ │ │ │ ├── SubMenu.vue
│ │ │ │ │ │ │ ├── VerticalMenu.vue
│ │ │ │ │ │ │ └── index.ts
│ │ │ │ │ │ └── index.vue
│ │ │ │ │ └── index.ts
│ │ │ │ └── index.vue
│ │ │ ├── Tab
│ │ │ │ ├── components
│ │ │ │ │ └── ContextMenu.vue
│ │ │ │ └── index.vue
│ │ │ └── index.ts
│ │ ├── index.ts
│ │ └── style
│ │     └── layout.module.less
│ ├── locale
│ │ ├── en-US
│ │ │ └── settings.ts
│ │ ├── en-US.ts
│ │ ├── index.ts
│ │ ├── zh-CN
│ │ │ └── settings.ts
│ │ └── zh-CN.ts
│ ├── main.ts
│ ├── plugins
│ │ ├── arco-design-icon.ts
│ │ ├── arco-design.ts
│ │ ├── assets.ts
│ │ ├── i18n.ts
│ │ ├── index.ts
│ │ ├── permission.ts
│ │ ├── theme.ts
│ │ ├── v-download.ts
│ │ └── v-md-editor.ts
│ ├── router
│ │ ├── guard
│ │ │ ├── dynamic.ts
│ │ │ ├── index.ts
│ │ │ └── permission.ts
│ │ ├── helpers
│ │ │ ├── index.ts
│ │ │ └── scroll.ts
│ │ ├── index.ts
│ │ ├── modules
│ │ │ ├── dashboard.ts
│ │ │ ├── function.ts
│ │ │ └── index.ts
│ │ ├── modules_bak
│ │ │ ├── about.ts
│ │ │ ├── components.ts
│ │ │ ├── dashboard.ts
│ │ │ ├── errors.ts
│ │ │ ├── form.ts
│ │ │ ├── index.ts
│ │ │ ├── list.ts
│ │ │ ├── profile.ts
│ │ │ └── visualization.ts
│ │ └── routes
│ │     └── index.ts
│ ├── settings
│ │ ├── animateSetting.ts
│ │ ├── componentSetting.ts
│ │ ├── designSetting.ts
│ │ ├── index.ts
│ │ ├── projectSetting.ts
│ │ ├── theme.json
│ │ └── theme.ts
│ ├── store
│ │ ├── index.ts
│ │ └── modules
│ │     ├── app
│ │     │ └── index.ts
│ │     ├── auth
│ │     │ └── index.ts
│ │     ├── index.ts
│ │     ├── route
│ │     │ └── index.ts
│ │     ├── tab
│ │     │ ├── helpers.ts
│ │     │ └── index.ts
│ │     └── theme
│ │         ├── helpers.ts
│ │         └── index.ts
│ ├── typings
│ │ ├── api.d.ts
│ │ ├── arco.d.ts
│ │ ├── business.d.ts
│ │ ├── components.d.ts
│ │ ├── config.d.ts
│ │ ├── end.d.ts
│ │ ├── global.d.ts
│ │ ├── module.d.ts
│ │ ├── package.d.ts
│ │ ├── route.d.ts
│ │ ├── router.d.ts
│ │ ├── system.d.ts
│ │ └── util.d.ts
│ ├── utils
│ │ ├── auth
│ │ │ ├── index.ts
│ │ │ └── user.ts
│ │ ├── bus.ts
│ │ ├── color.ts
│ │ ├── common
│ │ │ ├── color.ts
│ │ │ ├── console.ts
│ │ │ ├── design-pattern.ts
│ │ │ ├── domUtils.ts
│ │ │ ├── hook.ts
│ │ │ ├── icon.ts
│ │ │ ├── index.ts
│ │ │ ├── number.ts
│ │ │ ├── theme.ts
│ │ │ ├── typeof.ts
│ │ │ ├── url.ts
│ │ │ └── yaml.ts
│ │ ├── crypto
│ │ │ └── index.ts
│ │ ├── date.ts
│ │ ├── env.ts
│ │ ├── http
│ │ │ └── axios
│ │ │     ├── Axios.ts
│ │ │     ├── cancel.ts
│ │ │     ├── checkStatus.ts
│ │ │     ├── helper.ts
│ │ │     ├── index.ts
│ │ │     ├── transform.ts
│ │ │     └── types.ts
│ │ ├── index.ts
│ │ ├── log.ts
│ │ ├── propTypes.ts
│ │ ├── router
│ │ │ ├── auth.ts
│ │ │ ├── breadcrumb.ts
│ │ │ ├── cache.ts
│ │ │ ├── component.ts
│ │ │ ├── helpers.ts
│ │ │ ├── index.ts
│ │ │ ├── menu.ts
│ │ │ ├── module.ts
│ │ │ └── regexp.ts
│ │ ├── storage
│ │ │ └── storage.ts
│ │ └── watermark.ts
│ └── views
│     ├── about
│     │ ├── components
│     │ │ ├── devDependencies.vue
│     │ │ ├── index.ts
│     │ │ ├── model.ts
│     │ │ └── proDependencies.vue
│     │ └── index.vue
│     ├── base-view
│     │ ├── components
│     │ │ ├── ExceptionBase.vue
│     │ │ └── index.ts
│     │ ├── login
│     │ │ ├── components
│     │ │ │ ├── BindWechat
│     │ │ │ │ └── index.vue
│     │ │ │ ├── CodeLogin
│     │ │ │ │ └── index.vue
│     │ │ │ ├── LoginBg
│     │ │ │ │ └── index.vue
│     │ │ │ ├── PwdLogin
│     │ │ │ │ ├── index.vue
│     │ │ │ │ ├── locale
│     │ │ │ │ │ ├── en-US.ts
│     │ │ │ │ │ └── zh-CN.ts
│     │ │ │ │ └── types.ts
│     │ │ │ ├── Register
│     │ │ │ │ └── index.vue
│     │ │ │ ├── ResetPwd
│     │ │ │ │ └── index.vue
│     │ │ │ ├── banner.vue
│     │ │ │ └── index.ts
│     │ │ └── index.vue
│     │ ├── no-permission
│     │ │ └── index.vue
│     │ ├── not-found
│     │ │ └── index.vue
│     │ ├── not-found-page
│     │ │ └── index.vue
│     │ └── service-error
│     │     └── index.vue
│     ├── component
│     │ ├── button
│     │ │ └── index.vue
│     │ ├── card
│     │ │ └── index.vue
│     │ ├── form
│     │ │ └── index.vue
│     │ ├── markdown
│     │ │ └── index.vue
│     │ ├── split
│     │ │ └── index.vue
│     │ └── table
│     │     └── index.vue
│     ├── dashboard
│     │ ├── analysis
│     │ │ └── index.vue
│     │ └── workbench
│     │     ├── component
│     │     │ ├── TechnologyCard.vue
│     │     │ └── index.ts
│     │     └── index.vue
│     ├── document
│     │ ├── vite
│     │ │ └── index.vue
│     │ ├── vue
│     │ │ └── index.vue
│     │ └── vue-new
│     │     └── index.vue
│     ├── exception
│     │ ├── 403
│     │ │ ├── index.vue
│     │ │ └── locale
│     │ │     ├── en-US.ts
│     │ │     └── zh-CN.ts
│     │ ├── 404
│     │ │ ├── index.vue
│     │ │ └── locale
│     │ │     ├── en-US.ts
│     │ │     └── zh-CN.ts
│     │ └── 500
│     │     ├── index.vue
│     │     └── locale
│     │         ├── en-US.ts
│     │         └── zh-CN.ts
│     ├── form
│     │ ├── group
│     │ │ └── index.vue
│     │ └── step
│     │     └── index.vue
│     ├── function
│     │ ├── tab
│     │ │ └── index.vue
│     │ ├── tab-detail
│     │ │ └── index.vue
│     │ └── tab-multi-detail
│     │     └── index.vue
│     ├── index.ts
│     ├── initdb
│     │ └── index.vue
│     ├── list
│     │ ├── card
│     │ │ └── index.vue
│     │ └── search-table
│     │     └── index.vue
│     ├── plugin
│     │ ├── charts
│     │ │ ├── d3
│     │ │ │ └── index.vue
│     │ │ └── echarts
│     │ │     └── index.vue
│     │ ├── copy
│     │ │ └── index.vue
│     │ ├── editor
│     │ │ ├── markdown
│     │ │ │ └── index.vue
│     │ │ ├── quill
│     │ │ │ └── index.vue
│     │ │ └── yaml
│     │ │     └── index.vue
│     │ ├── icon
│     │ │ ├── icons.ts
│     │ │ └── index.vue
│     │ ├── map
│     │ │ ├── component
│     │ │ │ ├── BaiduMap.vue
│     │ │ │ ├── GaodeMap.vue
│     │ │ │ ├── GoogleMap.vue
│     │ │ │ ├── TengxunMap.vue
│     │ │ │ └── index.ts
│     │ │ └── index.vue
│     │ ├── print
│     │ │ └── index.vue
│     │ ├── swiper
│     │ │ └── index.vue
│     │ └── video
│     │     └── index.vue
│     ├── profile
│     │ └── basic
│     │     └── index.vue
│     ├── redirect
│     │ └── index.vue
│     ├── state
│     │ └── index.vue
│     ├── system
│     │ ├── api
│     │ │ └── index.vue
│     │ ├── auth
│     │ │ ├── components
│     │ │ │ ├── apis.vue
│     │ │ │ ├── menus.vue
│     │ │ │ ├── operationModel.vue
│     │ │ │ └── types.ts
│     │ │ └── index.vue
│     │ ├── menu
│     │ │ ├── components
│     │ │ │ └── CreateMenu.vue
│     │ │ ├── index.vue
│     │ │ └── menu-types.ts
│     │ ├── operationRecord
│     │ │ └── index.vue
│     │ └── user
│     │     ├── components
│     │     │ ├── CreateUser.vue
│     │     │ └── styles
│     │     │     └── index.less
│     │     └── index.vue
│     └── visualization
│         ├── data-analysis
│         │ └── index.vue
│         └── multi-dimension-data-analysis
│             └── index.vue
├── stylelint.config.js
├── tailwind.config.js
├── tsconfig.json
├── uno.config.ts
├── vite.config.ts
├── yarn-error.log
└── yarn.lock
```

## 2. 使用说明

### 2.1 开发

```
# 克隆项目
git clone https://github.com/LLiuHuan/arco-design-pro-vue.git

# 进入项目目录
cd arco-design-pro-vue

# 安装依赖
yarn install

# 启动服务
yarn dev
```

## 3. 更新日志

[CHANGELOG](CHANGELOG.md)

### 计划

0. 纠结

- [ ] 缓存页面

1. 基础功能

- [ ] 首页框架
- [ ] 亮色/暗黑模式切换（需不需要加个跟随系统）
- [ ] 国际化（中英文）
- [ ] 全屏
- [ ] 基础功能
- [ ] Markdown编辑器
- [ ] 登陆页
- [ ] 图表
- [ ] 富文本
- [ ] 拖拽
- [ ] 基础图片上传
- [ ] Excel导入导出
- [ ] 导出Zip
- [ ] Json编辑器
- [ ] Clipboard
- [ ] 小组件
- [ ] 引导页
- [ ] 权限控制（目前想做到按钮级权限控制，这个就看到时候用go写后端的时候好不好设计吧，如果不好弄可能只会做到角色级别）
- [ ] 断点续传（这个看后端）
- [ ] 操作历史
- [ ] api管理（主要是为了配合go后端）
- [ ] websocket
- [ ] 打印
- [ ] 文件下载
- [ ] 水印（看情况吧）
- [ ] 图片裁剪
- [ ] 二维码
- [ ] 密码强度

2. 其他功能

- [ ] 第三方登录（Github、QQ等）
- [ ] 大数据（看心情）
- [ ] 错误日志收集（参考 vue-element-admin，这个不一定会做，毕竟不怎么会前端 ）
- [ ] 更新记录
- [ ] 服务器信息


##  致谢

<a title="jetbrains" href="https://www.jetbrains.com/" target="_blank">
  <img style="width: 50px" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo (Main) logo.">
</a>



## License

Ths project is [MIT licensed](https://github.com/LLiuHuan/arco-design-pro-vue/blob/master/LICENSE).

