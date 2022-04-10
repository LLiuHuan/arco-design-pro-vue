# arco-design-pro-vue
<p align="center">
  <img width="55" src="http://qiniu.54cc.cc/uPic/Arco Logo.png">
</p>

<p align="center">
  <a href="https://github.com/LLiuHuan/arco-design-pro-vue"><img src="https://img.shields.io/circleci/project/github/vuejs/vue/dev.svg?sanitize=true" alt="Build Status"></a>
  <a href="https://github.com/LLiuHuan/arco-design-pro-vue/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"></a>
</p>

> 技术不好，也没啥时间，随便写写，对付看吧，喜欢的话可以点个 Start

## 1. 基本介绍
### 1.1 项目介绍
> 原本是打算实现 arco-design-pro 的vue版本，但是看官方说21年12月份就会推出vue版本的，所以这个项目就不会完全照搬 arco-design-pro 了

~~在线预览~~：[https://lliuhuan.github.io/arco-design-pro-vue](https://lliuhuan.github.io/arco-design-pro-vue)  
在线预览：[http://arco-vue.54cc.cc](http://arco-vue.54cc.cc)

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
yarn dev:mock
```

## 3. 更新日志
[CHANGELOG](CHANGELOG.md)



### 计划
0. 纠结
 - [ ] 缓存页面
1. 基础功能 
- [x] 首页框架
- [x] 亮色/暗黑模式切换（需不需要加个跟随系统） 
- [x] 国际化（中英文） 
- [x] 全屏
- [x] 基础功能
- [x] Markdown编辑器
- [x] 登陆页
- [ ] 图表
- [ ] 富文本
- [x] 拖拽
- [ ] 基础图片上传
- [ ] Excel导入导出
- [ ] 导出Zip
- [ ] Json编辑器
- [ ] Clipboard
- [ ] 小组件
- [ ] 引导页
- [x] 权限控制（目前想做到按钮级权限控制，这个就看到时候用go写后端的时候好不好设计吧，如果不好弄可能只会做到角色级别）
- [ ] 断点续传（这个看后端）
- [x] 操作历史
- [x] api管理（主要是为了配合go后端）
- [ ] websocket
- [ ] 打印
- [ ] 文件下载
- [x] 水印（看情况吧）
- [ ] 图片裁剪
- [ ] 二维码
- [ ] 密码强度
2. 其他功能
- [ ] 第三方登录（Github、QQ等）
- [ ] 大数据（看心情）
- [ ] 错误日志收集（参考 vue-element-admin，这个不一定会做，毕竟不怎么会前端 ）
- [x] 更新记录
- [x] 服务器信息
