import { describe, it, expect, vi } from 'vitest'
import { checkIsValidInput } from './checkInputValidation' 

describe('checkIsValidInput', () => {
  
  describe('Валидация длины (minLength / maxLength)', () => {
    it('должна возвращать true, если длина в пределах нормы', () => {
      expect(checkIsValidInput('hello', { minLength: 3, maxLength: 10 })).toBe(true)
    })

    it('должна возвращать false, если строка слишком короткая (с учетом trim)', () => {
      expect(checkIsValidInput('  hi  ', { minLength: 3 })).toBe(false) // 'hi'.length = 2
    })

    it('должна возвращать false, если строка превышает maxLength', () => {
      expect(checkIsValidInput('longstring', { maxLength: 5 })).toBe(false)
    })
  })

  describe('Валидация чисел (minNumber / maxNumber)', () => {
    it('должна возвращать true, если число в заданном диапазоне', () => {
      expect(checkIsValidInput('5', { minNumber: 1, maxNumber: 10 })).toBe(true)
    })

    it('должна возвращать false, если число меньше minNumber', () => {
      // Передаем корректное положительное число, которое меньше порога
      expect(checkIsValidInput('2', { minNumber: 5 })).toBe(false)
    })

    it('должна корректно обрабатывать 0 (ноль) как валидный порог', () => {
      // Проверяем, что 0 не считывается как undefined и корректно проходит границы
      expect(checkIsValidInput('0', { minNumber: 0, maxNumber: 0 })).toBe(true)
      expect(checkIsValidInput('5', { minNumber: 0, maxNumber: 2 })).toBe(false)
    })

    it('должна очищать строку от не-цифр перед числовой валидацией', () => {
      // Документируем заложенное поведение: буквы удаляются, '12а3' превращается в 123
      // 123 больше порога 50 -> true
      expect(checkIsValidInput('12а3', { minNumber: 50 })).toBe(true)
      
      // '2а3' превращается в 23. 23 меньше порога 50 -> false
      expect(checkIsValidInput('2а3', { minNumber: 50 })).toBe(false)
    })
  })

  describe('Регулярные выражения (patternRegExp)', () => {
    it('должна возвращать true, если строка соответствует регулярному выражению', () => {
      const onlyDigits = /^\d+$/
      expect(checkIsValidInput('12345', { patternRegExp: onlyDigits })).toBe(true)
    })

    it('должна возвращать false, если строка НЕ соответствует регулярному выражению', () => {
      const onlyDigits = /^\d+$/
      expect(checkIsValidInput('123a45', { patternRegExp: onlyDigits })).toBe(false)
    })
  })

  describe('Кастомная проверка (customCheck)', () => {
    it('должна вызывать customCheck и возвращать его результат', () => {
      const mockCustomCheck = vi.fn((val) => val === 'secret')
      
      expect(checkIsValidInput('secret', { customCheck: mockCustomCheck })).toBe(true)
      expect(mockCustomCheck).toHaveBeenCalledWith('secret')
    })

    it('должна игнорировать patternRegExp, если передан customCheck', () => {
      // Проверяем текущий приоритет в коде: customCheck идет первым
      const customCheck = () => false
      const patternRegExp = /.*/ // всегда true
      
      expect(checkIsValidInput('anything', { customCheck, patternRegExp })).toBe(false)
    })
  })

  describe('Дефолтное поведение', () => {
    it('должна возвращать true, если правила валидации не переданы', () => {
      expect(checkIsValidInput('any value')).toBe(true)
    })
  })
})
