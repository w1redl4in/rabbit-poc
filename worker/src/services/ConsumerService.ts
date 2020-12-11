import { RabbitPublisher } from '../rabbit/RabbitPublisher';

interface Message {
  firstNumber: number;
  secondNumber: number;
}

class ConsumerService {
  private readonly publisher: RabbitPublisher;

  constructor() {
    this.publisher = RabbitPublisher.getInstance();
  }

  async handleConsume(msg: Message) {
    const { firstNumber, secondNumber } = msg;

    const result = firstNumber + secondNumber;

    console.log('resultado', result);

    await this.publisher.publishOnQueue('rabbit-queue', String(result));
  }
}

export default new ConsumerService();
