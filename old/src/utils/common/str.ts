// Convert string to camel case
// Example: strToCamelCase('foo_bar') => 'fooBar'
export const strToUpperCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/( |^|_)[a-z]/g, (L) => L.toUpperCase())
    .replaceAll('_', '');
};

// Convert string to snake case
// Example: strToSnakeCase('fooBar') => 'foo_bar'
export const strToSnakeCase = (str: string) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};
