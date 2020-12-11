import amqp from 'amqplib';
import { RabbitClient } from './RabbitClient';
import { IRabbitConsumerHandler } from './types';

class RabbitConsumer {
  public async consume(queue: string, handler: IRabbitConsumerHandler) {
    const client = RabbitClient.getInstance();
    client.channel.prefetch(1);
    client.channel.consume(queue, async (msg) => {
      if (msg) {
        console.info(
          `RabbitConsumer::consume::${queue}::received - ${msg.content}`
        );

        try {
          const deleteMessage = await handler.handle(queue, msg);

          if (deleteMessage) {
            client.channel.ack(msg);
          } else {
            client.channel.nack(msg, false, false);
          }
        } catch (error) {
          console.error(
            `RabbitConsumer::consume::${queue}::error::${error.message}`
          );
          client.channel.nack(msg, false, false);
        }
      }
    });
  }
}

export default new RabbitConsumer();
