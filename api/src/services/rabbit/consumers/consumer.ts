import { Message } from 'amqplib';
import UserService from '../../../apps/User/UserService';
import { IRabbitConsumerHandler } from '../types';

class ConsumerHandler implements IRabbitConsumerHandler {
  async handle(_: string, msg: Message): Promise<any> {
    await UserService.consume(JSON.parse(msg.content.toString()));
    return true;
  }
}

export default new ConsumerHandler();
