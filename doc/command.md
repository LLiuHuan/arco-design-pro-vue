```sh
  "scripts": {
    # 提交代码
    "commit": "czg",
    # 运行项目
    "bootstrap": "pnpm install",
    # 运行项目
    "dev": "cross-env VITE_ENV_TYPE=dev vite",
    # 构建项目
    "build": "vue-tsc --noEmit && cross-env NODE_ENV=production && vite build && esno ./build/script/postBuild.ts",
    # 构建测试项目
    "build:test": "cross-env vite build --mode test && esno ./build/script/postBuild.ts",
    # 清空缓存后构建项目
    "build:no-cache": "pnpm clean:cache && npm run build",
    # 运行项目
    "serve": "vite preview",
    # 类型检查
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    # 预览打包后的内容（先打包在进行预览）
    "preview": "npm run build && vite preview",
    # 直接预览本地 dist 文件目录
    "preview:dist": "vite preview",
    # 生成 ChangeLog
    "log": "conventional-changelog -p angular -i CHANGELOG.md -s",
    # 删除缓存
    "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
    # 删除 node_modules (`window` 系统手动删除该目录较慢，可以使用该命令来进行删除)
    "clean:lib": "rimraf node_modules",
    # 执行 eslint 校验，并修复部分问题
    "lint:eslint": "eslint --cache --max-warnings 0  \"{src,mock}/**/*.{vue,ts,tsx}\" --fix",
    # 执行 prettier 格式化（该命令会对项目所有代码进行 prettier 格式化，请谨慎执行）
    "lint:prettier": "prettier --write  \"src/**/*.{js,json,tsx,css,less,scss,vue,html,md}\"",
    # 执行 stylelint 校验，并修复部分问题
    "lint:stylelint": "stylelint --cache --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
    # 检查代码格式
    "lint:lint-staged": "lint-staged",
    # 运行单元测试
    "test:unit": "jest",
    # 对打包结果进行 gzip 测试
    "test:gzip": "npx http-server dist --cors --gzip -c-1",
    # 对打包结果进行 brotli 测试
    "test:br": "npx http-server dist --cors --brotli -c-1",
    # 将打包结果部署到 gh-pages 分支
    "deploy": "cross-env NODE_ENV=production vue-tsc --noEmit && vite build --mode production && cp .nojekyll dist/ && gh-pages -d dist -t true",
    # 重新安装依赖
    "reinstall": "rimraf pnpm-lock.yaml && rimraf package.lock.json && rimraf node_modules && npm run bootstrap",
    "prepare": "husky install",
    "gen:icon": "esno ./build/generate/icon/index.ts"
  }
```
