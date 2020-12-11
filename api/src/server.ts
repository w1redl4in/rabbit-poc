import { RabbitClient } from './services/rabbit/RabbitClient';
import RabbitConsumer from './services/rabbit/RabbitConsumer';
import ConsumerHandler from './services/rabbit/consumers/consumer';

const app = require('./app').default;

app.listen(3000, () => {
  function connectConsumers() {
    RabbitConsumer.consume('rabbit-queue', ConsumerHandler);
  }
  const rabbitClient = RabbitClient.getInstance();
  if (rabbitClient.connection) connectConsumers();
  else rabbitClient.emitter.on('connected', connectConsumers);
});
