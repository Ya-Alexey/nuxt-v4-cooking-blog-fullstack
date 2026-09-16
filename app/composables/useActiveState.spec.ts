import { isReadonly } from 'vue'
import { useActiveState } from './useActiveState'
import { describe, it, expect } from 'vitest'

describe('useActiveState composable', () => {

  it('должен инициализироваться с дефолтным значением false', () => {
    const { isActive } = useActiveState()
    expect(isActive.value).toBe(false)
  })

  it('должен инициализироваться с переданным значением true', () => {
    const { isActive } = useActiveState(true)
    expect(isActive.value).toBe(true)
  })

  it('должен возвращать readOnly состояние для isActive', () => {
    const { isActive } = useActiveState()
    
    // Проверяем встроенной функцией Vue, что свойство защищено от прямой записи
    expect(isReadonly(isActive)).toBe(true)
  })

  describe('Метод toggleState', () => {
    it('должен инвертировать состояние без аргументов', () => {
      const { isActive, toggleState } = useActiveState(false)
      
      toggleState()
      expect(isActive.value).toBe(true)

      toggleState()
      expect(isActive.value).toBe(false)
    })

    it('должен принудительно устанавливать состояние, если передан boolean аргумент', () => {
      const { isActive, toggleState } = useActiveState(false)

      // Принудительно включаем
      toggleState(true)
      expect(isActive.value).toBe(true)

      // Повторный вызов true не должен инвертировать, должен оставить true
      toggleState(true)
      expect(isActive.value).toBe(true)

      // Принудительно выключаем
      toggleState(false)
      expect(isActive.value).toBe(false)
    })
  })

  describe('Методы setActiveOn и setActiveOff', () => {
    it('setActiveOn должен переводить состояние в true', () => {
      const { isActive, setActiveOn } = useActiveState(false)
      
      setActiveOn()
      expect(isActive.value).toBe(true)
      
      // Повторный вызов не должен ничего ломать
      setActiveOn()
      expect(isActive.value).toBe(true)
    })

    it('setActiveOff должен переводить состояние в false', () => {
      const { isActive, setActiveOff } = useActiveState(true)
      
      setActiveOff()
      expect(isActive.value).toBe(false)
      
      // Повторный вызов не должен ничего ломать
      setActiveOff()
      expect(isActive.value).toBe(false)
    })
  })
})
