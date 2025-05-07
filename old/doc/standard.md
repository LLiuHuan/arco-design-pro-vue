

## 通用规范

## 0x01 项目名称

> 全部小写，单词之间用中线分隔

**示例**

```text
arco-design-pro-vue
```

## 0x02 项目目录

> 


## 0x03 组件命名规范

**PascalCase (单词首字母大写命名)是最通用的声明约定**  
**kebab-case (短横线分隔命名) 是最通用的使用约定**

- 组件名应该始终是多个单词的，根组件 App 除外
- 有意义的名词、简短、具有可读性
- 命名遵循 PascalCase 约定
  - 公用组件以 Abcd (公司名缩写简称) 开头，如（`AbcdDatePicker,AbcdTable`）
  - 页面内部组件以组件模块名简写为开头，Item 为结尾，如（`StaffBenchToChargeItem，StaffBenchAppNotArrItem`）
- 使用遵循 kebab-case 约定
  - 在页面中使用组件需要前后闭合，并以短线分隔，如（`<abcd-date-picker></abcd-date-picker>，<abcd-table></abcd-table>`）
- 导入及注册组件时，遵循 PascalCase 约定
- 同时还需要注意：必须符合自定义元素规范: 切勿使用保留字。

## 0x04 views 下的文件命名

- 只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 index.vue
- 尽量是名词,且使用驼峰命名法
- 开头的单词就是所属模块名字（workbenchIndex、workbenchList、workbenchEdit）
- 名字至少两个单词（good: workbenchIndex）（bad:workbench）

## 务必添加注释列表

1. 公共组件使用说明
2. 各组件中重要函数或者类说明
3. 复杂的业务逻辑处理说明
4. 特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的 hack、使用了某种算法或思路等需要进行注释描述
5. 多重 if 判断语句
6. 注释块必须以 `/**（至少两个星号）开头**/`
7. 单行注释使用 //

### 单行注释

  ```javascript
  // 错误示例
  let name = 'arco-design-pro-vue'; // 姓名
  // 正确示例
  // 姓名
  let name = '';
  ```

### 多行注释

  ```javascript
  // 尽量详细吧，暂时还没想好
  ```
## 代码规范

1. 使用ES6风格编码
   1. 变量使用let，常量使用const
   2. 静态字符串一律使用单引号或反引号，不使用双引号，动态字符串使用反引号
   3. 使用解构数组
   4. 拷贝数组
   5. 
2. 使用ESLint进行代码检查
3. 使用解构赋值
4. 拷贝数组使用 ...
5. 尽量使用箭头函数
6. 模块
   1. 如果模块只有一个输出值就使用export default, 如果模块有多个输出值就不使用export default, 而是直接输出多个值
   2. 如果模块默认输出一个函数，函数名的首字母应该小写
   3. 如果模块默认输出一个对象，对象名的首字母应该大写

## 指令规范

1. 指令有缩写的情况下，使用缩写
2. v-for 指令必须带有 key
3. v-if 和 v-for 不能同时使用

## Props定义尽量详细

## 其他规范

1. console.log debugger使用完应该及时删除
2. 除了三目运算符，if else 语句必须使用大括号

## CSS规范

1. 统一使用 - 连字符命名法
2. 省略之为0时，不要写单位
3. 如果css可以做到就不要使用js
4. 如果可以的话尽量使用缩写值
  ```css
  /*错误示例*/
  .box {
    font-family: palatino, georgia, serif;
    font-size: 100%;
    line-height: 1.6;
  }

  /*正确示例*/
  .box {
    font: 100%/1.6 palatino, georgia, serif;
  }
  ```
5. 声明应该按照下表的顺序
6. 元素选择器应该避免在scoped中出现
7. 分类的命名方法
   使用单个字母加上"-"为前缀

布局（grid）（.g-）；

模块（module）（.m-）；

元件（unit）（.u-）；

功能（function）（.f-）；

皮肤（skin）（.s-）；

状态（.z-）。

