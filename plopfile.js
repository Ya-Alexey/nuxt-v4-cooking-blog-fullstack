import { domainActions } from './plop/actions/createDomain.js'
import { domainJsonActions } from './plop/actions/domainJson.js'

export default function (plop) {
  // plop.setWelcomeMessage(
  //   '[CLI] Выберите генератор ниже, чтобы быстро создать файлы по стандартам нашей команды:'
  // );

  plop.setGenerator("domain", {
    description: 'Создание нового архитектурного домена',
    prompts: [
      { 
        type: 'input', 
        name: 'name', 
        message: 'Имя домена (например: catalog, ):',
        validate: function (value) {
          if (/.+/.test(value.trim())) { 
            return true; 
          }
          return 'Название домена не может быть пустым!';
        }
      },
    ],
    actions: [
      ...domainActions,
      ...domainJsonActions,
    ],
  });
}