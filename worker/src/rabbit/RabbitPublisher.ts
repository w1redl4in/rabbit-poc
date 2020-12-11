import { RabbitClient } from './RabbitClient';

export class RabbitPublisher {
  private static instance: RabbitPublisher;

  private client = RabbitClient.getInstance();

  static getInstance(): RabbitPublisher {
    if (!this.instance) this.instance = new RabbitPublisher();

    return this.instance;
  }

  public async publishOnQueue(queue: string, msg: string): Promise<void> {
    await this.client.channel.sendToQueue(queue, Buffer.from(msg));
  }
}
