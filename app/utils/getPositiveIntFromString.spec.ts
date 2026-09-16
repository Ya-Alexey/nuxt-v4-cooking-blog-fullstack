
import { describe, it, expect } from 'vitest'
import { getPositiveIntFromString } from './getPositiveIntFromString'

describe('getPositiveIntFromString', () => {

  describe('Тип возвращаемого значения: string (по умолчанию)', () => {
    it('должна извлекать цифры из строки с текстом', () => {
      expect(getPositiveIntFromString('тел. +7 (999) 123-45-67')).toBe('79991234567')
    })

    it('должна возвращать пустую строку, если в исходной строке нет цифр', () => {
      expect(getPositiveIntFromString('нет цифр в этой строке')).toBe('')
    })

    it('должна игнорировать знаки минус и точки (удаляет их)', () => {
      // Так как \D удаляет все кроме цифр, знаки '-' и '.' пропадут
      expect(getPositiveIntFromString('-123.45')).toBe('12345')
    })

    it('должна корректно работать с уже числовой строкой', () => {
      expect(getPositiveIntFromString('42')).toBe('42')
    })
  })

  describe('Тип возвращаемого значения: number', () => {
    it('должна извлекать цифры и приводить их к типу number', () => {
      const result = getPositiveIntFromString('Цена: 1500 руб.', 'number')
      expect(result).toBe(1500)
      expect(typeof result).toBe('number')
    })

    it('должна возвращать 0 (ноль), если в строке нет цифр', () => {
      // Так как регвыражение вернет '', а Number('') в JS равен 0
      const result = getPositiveIntFromString('только текст', 'number')
      expect(result).toBe(0)
    })

    it('должна корректно преобразовывать строку с нулем', () => {
      expect(getPositiveIntFromString('0', 'number')).toBe(0)
    })
    
    it('должна склеивать разделенные цифры в одно число', () => {
      // Проверяем, как ведет себя логика, если цифры разбиты текстом
      expect(getPositiveIntFromString('1 вариант и 2 альтернатива', 'number')).toBe(12)
    })
  })
})