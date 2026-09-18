import withNuxt from './.nuxt/eslint.config.mjs'
import DOMAINS from './domains.json' with { type: 'json' };

export default withNuxt(
  // Глобальная зона (app, страницы и корень проекта)
  {
    name: 'custom:global-domain-public-api-boundaries',
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          // Запрещаем прямой импорт через ~~ вглубь доменов
          {
            regex: '^~{2}\\/domains\\/[^\\/]+\\/.+',
            message: 'Прямой импорт внутренних файлов домена запрещен. Используйте Public API домена (например, "#domain_catalog_api").'
          },
          // Запрещаем использовать внутренние алиасы доменов в глобальной зоне
          {
            regex: '^#(?!.*_api)([^\\/]+)(\\/.+)?$',
            message: 'В глобальной зоне разрешено использовать только Public API доменов. Замените алиас на "#domain_имя_домена_api".'
          },
          // Запрещаем ЛЮБОЙ относительный импорт, содержащий "/domains/имя_домена"
          {
            regex: '\\/domains\\/([^\\/]+)',
            message: 'Относительный импорт в домены запрещен. Используйте Public API через алиас (например, "#domain_имя_домена_api").'
          }
        ]
      }]
    }
  },

  // Изолированные правила для каждого домена из domains.json
  ...DOMAINS.map((currentDomain) => {
    const otherDomains = DOMAINS.filter(d => d !== currentDomain);
    const crossDomainPatterns = [];

    // Запрет лезть через ~~ куда угодно
    crossDomainPatterns.push({
      regex: '^~{2}\\/domains\\/[^\\/]+\\/.+',
      message: 'Использовать ~~ для внутренних путей запрещено. Используйте свой внутренний алиас или Public API чужого домена.'
    })

    // Запрет использовать ВНУТРЕННИЕ алиасы ЧУЖИХ доменов
    crossDomainPatterns.push({
      regex: `^#domain_(?!${currentDomain}(?:\\/|$))(?!.*_api)([^\\/]+)(\\/.+)?$`,
      message: `Вы находитесь в домене "${currentDomain}". Импорт внутренних файлов ЧУЖИХ доменов запрещен. Используйте их Public API ("#domain_имя_домена_api").`
    })

    // Если в строке относительного импорта встречается имя чужого домена,
    // и перед ним есть точки/слэши (выход наружу) — блокируем на корню.
    otherDomains.forEach(otherDomain => {
      crossDomainPatterns.push({
        // Ищет упоминание чужого домена в относительном пути: например, "../auth" или "../auth/components"
        regex: `(^|\\/)${otherDomain}(\\/|$)`,
        message: `Вы находитесь в домене "${currentDomain}". Относительный импорт в чужой домен "${otherDomain}" запрещен. Используйте "#domain_${otherDomain}_api".`
      })
    })

    return {
      name: `custom:domain-boundaries-${currentDomain}`,
      files: [`**/domains/${currentDomain}/**/*`],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: crossDomainPatterns
        }]
      }
    }
  }),
)
