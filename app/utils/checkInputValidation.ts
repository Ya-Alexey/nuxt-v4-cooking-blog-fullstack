export interface InputValidProps {
  minLength?: number
  maxLength?: number
  minNumber?: number
  maxNumber?: number
  patternRegExp?: RegExp
  customCheck?: (inputValue: string) => boolean
}

/**
 * тип для составления схемы валидации, по полям формы
 */
export type InputValidRules<TForm extends Record<keyof TForm, string>> = Record<keyof TForm, InputValidProps>

export function checkIsValidInput(
  inputValue: string,
  {
    maxLength,
    minLength,
    minNumber,
    maxNumber,
    patternRegExp,
    customCheck,
  }: InputValidProps = {}
) {
  const invalidLength = hasInvalidLength(inputValue, {
    maxLength,
    minLength,
  });
  if (invalidLength) {
    return false;
  }

  const invalidNumber = hasInvalidNumber(inputValue, {
    minNumber,
    maxNumber,
  });

  if (invalidNumber) {
    return false;
  }

  if (customCheck) {
    return customCheck(inputValue);
  }
  if (patternRegExp) {
    return patternRegExp.test(inputValue);
  }
  return true;
}

function hasInvalidLength(inputValue: string, {
  minLength = 0,
  maxLength,
}: InputValidProps = {}) {
  const valueLength = inputValue.trim().length;
  const invalidMinLength = valueLength < minLength;
  const invalidMaxLength = maxLength !== undefined && valueLength > maxLength;
  if (invalidMinLength || invalidMaxLength) {
    return true;
  }
  return false;
}

function hasInvalidNumber(inputValue: string, {
  minNumber,
  maxNumber,
}: InputValidProps = {}) {
  const numValue = Number(getNumberFromString(inputValue));
  const invalidMin = minNumber !== undefined && numValue < minNumber;
  const invalidMax = maxNumber !== undefined && numValue > maxNumber;
  if (invalidMin || invalidMax) {
    return true;
  }
  return false;
}
