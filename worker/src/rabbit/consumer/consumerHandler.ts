import { Message } from 'amqplib';
import ConsumerService from '../../services/ConsumerService';
import { IRabbitConsumerHandler } from '../types';

class ConsumerHandler implements IRabbitConsumerHandler {
  async handle(_: string, msg: Message): Promise<any> {
    await ConsumerService.handleConsume(JSON.parse(msg.content.toString()));
    return true;
  }
}

export default new ConsumerHandler();
