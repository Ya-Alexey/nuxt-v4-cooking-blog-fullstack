export const domainJsonActions = [{
  type: 'modify',
  path: 'domains.json',
  transform(fileContents, data) {
    const domains = JSON.parse(fileContents);
    const domainName = data.name;
    if (!domains.includes(domainName)) {
      domains.push(domainName);
    }
    return JSON.stringify(domains, null, 2);
  }
}]