import { CustomError } from 'express-handler-errors/dist/src/models/CustomError';
import { RabbitPublisher } from '../../services/rabbit/RabbitPublisher';

class UserService {
  private readonly publisher: RabbitPublisher;

  private message: any;

  constructor() {
    this.publisher = RabbitPublisher.getInstance();
  }

  async consume(msg?: any) {
    if (msg) {
      this.message = msg;
    }
    if (!this.message)
      throw new CustomError({
        code: 'PUBLISH_ERROR',
        message: 'Publique uma mensagem antes',
        status: 400,
      });

    return this.message;
  }

  async create(data: any) {
    await this.publisher.publishOnQueue('rabbit-queue', JSON.stringify(data));
    return data;
  }
}

export default new UserService();
