import amqp from 'amqplib';

export type IRabbitConsumerHandler = {
  handle(queue: string, msg: amqp.Message): Promise<any>;
};
