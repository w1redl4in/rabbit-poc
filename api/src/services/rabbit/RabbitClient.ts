import amqp from 'amqplib';

import { EventEmitter } from 'events';

export class RabbitClient {
  public connection!: amqp.Connection;

  public channel!: amqp.Channel;

  public emitter = new EventEmitter();

  private static instance: RabbitClient;

  private appStarted = false;

  constructor() {
    this.createConnection();
  }

  private createConnection() {
    console.info('RabbitClient::createConnection::connecting::');
    amqp
      .connect({
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest',
        vhost: 'felipe',
      })
      .then((conn) => {
        this.connection = conn;
        console.info('RabbitClient::createConnection::connected::');
        console.info('RabbitClient::createConnection::creating channel::');
        this.connectChannel();
        console.info(
          'RabbitClient::createConnection::creating channel::success'
        );
        this.connection.on('error', (e) => {
          console.error(e);
        });
        this.connection.on('close', () => {
          console.log(`RabbitClient::createConnection::connection close`);
          this.channel.close();
          this.connection.close();
          console.log(`RabbitClient::createConnection::reconnection rabbitmq`);
          this.createConnection();
        });
      });
  }

  private connectChannel(): void {
    this.connection.createChannel().then((ch) => {
      this.channel = ch;

      if (!this.appStarted) {
        this.emitter.emit('connected');
        this.appStarted = true;
      }

      this.channel.on('close', () => {
        this.connectChannel();
      });
    });
  }

  static getInstance(): RabbitClient {
    if (!this.instance) this.instance = new RabbitClient();
    return this.instance;
  }
}
