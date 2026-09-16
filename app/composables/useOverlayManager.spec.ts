/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useOverlayManager, type OverlayInstance } from './useOverlayManager'

describe('useOverlayManager composable', () => {
  // Хелпер для создания фейкового оверлея
  const createMockOverlay = (id: string, type: OverlayType = 'dropdown', closeOnRouteChange = true): OverlayInstance => ({
    id,
    type,
    closeOnRouteChange,
    close: vi.fn(), // Шпион для отслеживания вызова закрытия
    triggerElement: ref(null),
    contentElement: ref(null),
  })

  // Очищаем состояние стейта Nuxt перед каждым тестом
  beforeEach(() => {
    const overlays = useState('overlays-list', () => [])
    const listener = useState('overlays-global-listener', () => false)
    overlays.value = []
    listener.value = false
  })

  describe('Управление массивом (Слой логики)', () => {
    it('должен регистрировать оверлеи и закрывать дропдауны при открытии модалки', () => {
      const { register } = useOverlayManager()
      const overlaysList = useState<OverlayInstance[]>('overlays-list')

      const dropdown = createMockOverlay('1', 'dropdown')
      const modal = createMockOverlay('2', 'modal')

      register(dropdown)
      expect(overlaysList.value.length).toBe(1)

      // При регистрации модалки все текущие дропдауны должны получить команду закрыться
      register(modal)
      expect(dropdown.close).toHaveBeenCalled()
      expect(overlaysList.value.length).toBe(2)
    })

    it('должен удалять оверлей при unregister и снимать листенеры, если список пуст', () => {
      const { register, unregister } = useOverlayManager()
      const listenerActive = useState('overlays-global-listener')

      const dropdown = createMockOverlay('1')
      
      register(dropdown)
      expect(listenerActive.value).toBe(true)

      unregister('1')
      expect(listenerActive.value).toBe(false)
    })

    it('closeByType должен закрывать только оверлеи указанного типа', () => {
      const { register, closeByType } = useOverlayManager()
      const dropdown = createMockOverlay('1', 'dropdown')
      const drawer = createMockOverlay('2', 'drawer')

      register(dropdown)
      register(drawer)

      closeByType('dropdown')
      expect(dropdown.close).toHaveBeenCalled()
      expect(drawer.close).not.toHaveBeenCalled()
    })
  })

  describe('Взаимодействие с DOM и событиями (Слой браузера)', () => {
    it('должен закрывать верхний оверлей при нажатии Escape и возвращать фокус', () => {
      const { register } = useOverlayManager()
      
      // фейковый элемент для триггера и мокаем ему метод focus
      const mockTrigger = document.createElement('button')
      const focusSpy = vi.spyOn(mockTrigger, 'focus')

      const dropdown = createMockOverlay('1')
      dropdown.triggerElement = mockTrigger

      register(dropdown)

      // Симулируем нажатие клавиши Escape на уровне документа
      const event = new KeyboardEvent('keydown', { key: 'Escape' })
      document.dispatchEvent(event)

      // Проверяем, что оверлей закрылся и фокус вернулся на кнопку
      expect(dropdown.close).toHaveBeenCalled()
      expect(focusSpy).toHaveBeenCalled()
    })

    it('должен закрывать оверлей при клике МИМО контента и триггера', () => {
      const { register } = useOverlayManager()
      
      const trigger = document.createElement('div')
      const content = document.createElement('div')
      const outsideElement = document.createElement('p')

      const dropdown = createMockOverlay('1')
      dropdown.triggerElement = trigger
      dropdown.contentElement = content

      register(dropdown)

      // Симулируем клик по элементу снаружи
      const event = new PointerEvent('pointerdown', { bubbles: true })
      Object.defineProperty(event, 'target', { value: outsideElement, enumerable: true })
      document.dispatchEvent(event)

      expect(dropdown.close).toHaveBeenCalled()
    })

    it('НЕ должен закрывать оверлей при клике ВНУТРЬ контента', () => {
      const { register } = useOverlayManager()
      
      const content = document.createElement('div')
      const insideElement = document.createElement('button')
      content.appendChild(insideElement) // Вкладываем кнопку внутрь контента

      const dropdown = createMockOverlay('1')
      dropdown.contentElement = content

      register(dropdown)

      // Кликаем по кнопке внутри контента
      const event = new PointerEvent('pointerdown', { bubbles: true })
      Object.defineProperty(event, 'target', { value: insideElement, enumerable: true })
      document.dispatchEvent(event)

      expect(dropdown.close).not.toHaveBeenCalled()
    })
  })
})
