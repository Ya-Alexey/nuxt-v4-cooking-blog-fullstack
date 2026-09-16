function getPositiveIntFromString(value: string, returnType?: 'string'): string;
function getPositiveIntFromString(value: string, returnType: 'number'): number;
function getPositiveIntFromString(value: string, returnType: 'string' | 'number' = 'string') {
  const numberPart = value.toString().replace(/\D/g, '');
  if (returnType === 'number') {
    return Number(numberPart);
  }
  return numberPart;
}

export {
  getPositiveIntFromString,
}