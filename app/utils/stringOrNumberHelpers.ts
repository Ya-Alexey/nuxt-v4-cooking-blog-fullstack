function getNumberFromString(value: string, returnType?: 'string'): string;
function getNumberFromString(value: string, returnType: 'number'): number;
function getNumberFromString(value: string, returnType: 'string' | 'number' = 'string') {
  const numberPart = value.toString().replace(/\D/g, '');
  if (returnType === 'number') {
    return Number(numberPart);
  }
  return numberPart;
}

export {
  getNumberFromString,
}