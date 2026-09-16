import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useValidInputScheme } from './useValidInputScheme' // скорректируйте путь

describe('useValidInputScheme composable', () => {
  
  // Тестовая схема валидации
  const testSchema = {
    username: { minLength: 3 },
    age: { minNumber: 18 }
  }

  it('должен возвращать все поля валидными, если данные верны', () => {
    const form = ref({ username: 'Alex', age: '25' })
    
    const { validFields, hasSomeInvalid } = useValidInputScheme(form, testSchema)

    expect(validFields.value.username).toBe(true)
    expect(validFields.value.age).toBe(true)
    // Общий флаг ошибки должен быть false
    expect(hasSomeInvalid.value).toBe(false)
  })

  it('должен реагировать на динамическое изменение данных в форме', () => {
    //(имя слишком короткое)
    const form = ref({ username: 'Al', age: '25' })
    
    const { validFields, hasSomeInvalid } = useValidInputScheme(form, testSchema)

    expect(validFields.value.username).toBe(false)
    expect(hasSomeInvalid.value).toBe(true)

    form.value.username = 'Alexander'

    expect(validFields.value.username).toBe(true)
    expect(hasSomeInvalid.value).toBe(false)
  })

  it('должен считать необязательное поле валидным, если для него передан пустой объект правил', () => {
    // Симулируем форму с обязательным username и необязательным comment
    const form = ref({ username: 'Alex', comment: '' })
    const schema = {
      username: { minLength: 3 },
      comment: {} // необязательное поле в рамках интерфейса FormFields
    }
    
    const { validFields, hasSomeInvalid } = useValidInputScheme(form, schema)

    // username прошел проверку, comment с пустыми правилами тоже должен быть true
    expect(validFields.value.username).toBe(true)
    expect(validFields.value.comment).toBe(true) 
    expect(hasSomeInvalid.value).toBe(false)
  })

  it('должен считать необязательное поле валидным, если явно указано minLength: 0', () => {
    const form = ref({ username: 'Alex', comment: '' })
    const schema = {
      username: { minLength: 3 },
      comment: { minLength: 0 } // явное указание для необязательного поля
    }
    
    const { validFields, hasSomeInvalid } = useValidInputScheme(form, schema)

    expect(validFields.value.comment).toBe(true) 
    expect(hasSomeInvalid.value).toBe(false)
  })


  it('должен корректно работать, если схема передана как ref объект', () => {
    const form = ref({ username: 'Al', age: '25' })
    const schemaRef = ref(testSchema)

    const { hasSomeInvalid } = useValidInputScheme(form, schemaRef)
    expect(hasSomeInvalid.value).toBe(true)

    // Динамически ослабляем правила в схеме (делаем minLength: 1)
    schemaRef.value = {
      ...testSchema,
      username: { minLength: 1 }
    }

    // Проверяем, что unref(schema) отработал реактивно и форма стала валидной
    expect(hasSomeInvalid.value).toBe(false)
  })
})
