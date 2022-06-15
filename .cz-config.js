// 提交代码：使用 npx cz 命令
// 相关配置：https://github.com/leoforfree/cz-customizable
module.exports = {
  types: [
    {value: 'feat', name: '✨ Features | 新功能'},
    {value: 'fix', name: '🐛 Bug Fixes | Bug 修复'},
    {value: 'docs', name: '📝 Documentation | 文档'},
    {value: 'style', name: '💄 Styles | 风格（代码样式更改，例如空格、格式、缺少分号等）'},
    {value: 'refactor', name: '💡 Code Refactoring | 代码重构'},
    {value: 'perf', name: '⚡️ Performance Improvements | 性能优化'},
    {value: 'revert', name: '⏪ Reverts | 回退'},
    {value: 'test', name: '✅ Tests | 测试（添加缺失或修正测试代码）'},
    {value: 'chore', name: '🔨 chore（构建相关的代码或工具库，如文档生成等）'},
    {value: 'build', name: '👷‍ Build System | 构建（如升级 npm 包、修改 脚手架 配置等）'},
    {value: 'ci', name: '🔧 Continuous Integration | CI 配置'},
    {value: 'chore', name: '🎫 Chores | 其他更新（不影响源文件、测试用例）'},
  ],
  scopes: [
    ['projects', '项目搭建'],
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['types', 'ts类型相关'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改'],
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),
  messages: {
    type: '请选择提交类型：（必填）',
    customScope: '请输入影响范围：（可选）',
    subject: '请输入简要描述：（必填）',
    body: '请输入详细描述，使用 "|" 分行：（可选）',
    breaking: '请列出所有的破坏性变更，例如：描述、理由或迁移方式等：（可选）',
    footer: '请列出需关闭的 issue，例如：#31, #34：（可选）',
    confirmCommit: '请确认此提交信息？'
  },
  subjectLimit: 100,// subject文字长度默认
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['scope', 'footer'] //默认跳过
};

//
// module.exports = {
//   types: [
//     {value: 'feat', name: 'feat:     新增功能'},
//     {value: 'fix', name: 'fix:      修复bug'},
//     {value: 'docs', name: 'docs:     文档变更'},
//     {value: 'style', name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）'},
//     {value: 'refactor', name: 'refactor: 代码重构（不包括 bug 修复、功能新增）'},
//     {value: 'perf', name: 'perf:     性能优化'},
//     {value: 'test', name: 'test:     添加、修改测试用例'},
//     {value: 'build', name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 脚手架 配置等）'},
//     {value: 'ci', name: 'ci:       修改 CI 配置、脚本'},
//     {value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）'},
//     {value: 'revert', name: 'revert:   回滚 commit'}
//   ],
//   scopes: [
//     ['projects', '项目搭建'],
//     ['components', '组件相关'],
//     ['hooks', 'hook 相关'],
//     ['utils', 'utils 相关'],
//     ['types', 'ts类型相关'],
//     ['styles', '样式相关'],
//     ['deps', '项目依赖'],
//     ['auth', '对 auth 修改'],
//     ['other', '其他修改'],
//     ['custom', '以上都不是？我要自定义']
//   ].map(([value, description]) => {
//     return {
//       value,
//       name: `${value.padEnd(30)} (${description})`
//     }
//   }),
//   messages: {
//     type: '请选择提交类型：（必填）',
//     scope: '\n选择一个影响范围（可选）：',
//     customScope: '请输入自定义的影响范围：',
//     subject: '请输入简要描述变更：（必填）：\n',
//     body: '请输入详细描述，使用 "|" 分行：（可选）：\n',
//     breaking: '请列出所有的破坏性变更，例如：描述、理由或迁移方式等：（可选）：\n',
//     footer: '请列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n',
//     confirmCommit: '确认提交？'
//   },
//   allowBreakingChanges: ['feat', 'fix'],
//   subjectLimit: 100,
//   breaklineChar: '|',
//   allowCustomScopes: true,
//   skipQuestions: ['scope', 'footer'] //默认跳过
// }
