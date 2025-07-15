<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-06-17 00:55:16
 * @LastEditTime: 2025-07-15 02:24:19
 * @LastEditors: LLiuHuan
-->
# @arco/vsh

一个 Shell 脚本工具集合，用于 Vue Arco Admin 项目的开发和管理。

## 功能特性

- 🚀 基于 Node.js 的现代化 Shell 工具
- 📦 支持模块化开发和按需加载
- 🔍 提供依赖检查和分析功能
- 🔄 支持循环依赖扫描
- 📝 提供包发布检查功能

## 安装

```bash
# 使用 pnpm 安装
pnpm add -D @arco/vsh

# 或者使用 npm
npm install -D @arco/vsh

# 或者使用 yarn
yarn add -D @arco/vsh
```

## 使用方法

### 全局安装

```bash
# 全局安装
pnpm add -g @arco/vsh

# 使用 vsh 命令
vsh [command]
```

### 本地使用

```bash
# 在 package.json 中添加脚本
{
  "scripts": {
    "vsh": "vsh"
  }
}

# 运行命令
pnpm vsh [command]
```

## 命令列表

- `vsh check-deps`: 检查项目依赖
- `vsh scan-circular`: 扫描循环依赖
- `vsh publish-check`: 检查包发布配置
