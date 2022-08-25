// import YAML from 'yaml';
// import yaml from 'js-yaml';
//
// // json转换为yaml格式
// export const json2yaml = (jsonData: string) => {
//   try {
//     return {
//       data: yaml.dump(JSON.parse(jsonData)),
//       error: false,
//     };
//   } catch (err) {
//     return {
//       data: '',
//       error: true,
//     };
//   }
// };
//
// // yamlStr 为字符串形式的yaml数据
// // returnString 是否返回字符串格式的json数据
// export const yaml2json = (yamlStr: string, returnString: string) => {
//   try {
//     return {
//       data: returnString ? JSON.stringify(YAML.parse(yamlStr), null, 2) : YAML.parse(yamlStr),
//       error: false,
//     };
//   } catch (err) {
//     return {
//       data: '',
//       error: true,
//     };
//   }
// };
