import express from 'express';
import { RabbitClient } from './rabbit/RabbitClient';

import RabbitConsumer from './rabbit/RabbitConsumer';

import ConsumerHandler from './rabbit/consumer/consumerHandler';

const app = express();

app.listen(3333, () => {
  console.log('worker subiu');

  function connectConsumers() {
    RabbitConsumer.consume('rabbit-queue', ConsumerHandler);
  }

  const rabbitClient = RabbitClient.getInstance();
  if (rabbitClient.connection) connectConsumers();
  else rabbitClient.emitter.on('connected', connectConsumers);
});
