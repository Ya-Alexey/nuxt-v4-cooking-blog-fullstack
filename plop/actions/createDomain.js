export const domainActions = [
  {
    type: 'addMany',
    destination: 'domains/{{kebabCase name}}',
    base: 'plop/templates/domain',
    templateFiles: 'plop/templates/domain/**/*',
    stripExtensions: ['hbs'] 
  },
]