import { Options } from 'amqplib';
import { RabbitClient } from './RabbitClient';

export class RabbitPublisher {
  private client = RabbitClient.getInstance();

  private static instance: RabbitPublisher;

  static getInstance(): RabbitPublisher {
    if (!this.instance) this.instance = new RabbitPublisher();

    return this.instance;
  }

  public async publishOnQueue(queue: string, msg: string): Promise<void> {
    await this.client.channel.sendToQueue(queue, Buffer.from(msg));
  }

  public async publishOnExchange(
    exchange: string,
    routingKey: string,
    msg: string,
    options?: Options.Publish
  ): Promise<void> {
    await this.client.channel.publish(
      exchange,
      routingKey,
      Buffer.from(msg),
      options
    );
  }
}
