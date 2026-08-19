export const serveicesLabelList = [
  'порция',
  'порции',
  'порций',
] as const;

/**
 * склонение слова в зависимости от числительного.
 * @param words - 
 *  - words[0] - Форма слова для '1' (например, "1 день").
 *  - words[1] - Форма слова для '2-4' (например, "2 дня").
 *  - words[2] - Форма слова для '0' и более '5' (например, "5 дней").
 */
export function declensionWord(
  count: number, 
  words: readonly [
    string, 
    string, 
    string
  ],
) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return words[2];
  } 
  if (lastDigit === 1) {
    return words[0];
  } 
  if (lastDigit >= 2 && lastDigit <= 4) {
    return words[1];
  } 
  return words[2];
}

