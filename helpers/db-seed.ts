/// <reference types="node" />

import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\x1b[31m%s\x1b[0m', '⚠️  ВНИМАНИЕ: Вы запускаете опасную операцию!\nВсе существующие записи будут удалены, и созданы новые!');

rl.question('Вы уверены, что хотите продолжить? (y/N): ', (answer) => {
  rl.close();
  
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('✅ Действие подтверждено. Продолжаем...');
    process.exit(0); // Успешное завершение, npm пойдет дальше
  } else {
    console.log('❌ Действие отменено пользователем.');
    process.exit(1); // Ошибка, npm остановит выполнение следующих команд
  }
});