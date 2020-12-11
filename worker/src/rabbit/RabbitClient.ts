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
    amqp
      .connect({
        hostname: 'localhost',
        password: 'guest',
        port: 5672,
        username: 'guest',
        vhost: 'felipe',
        protocol: 'amqp',
      })
      .then((conn) => {
        console.log('RabbitClient::Connecting::');
        this.connection = conn;
        this.connectChannel();
        this.connection.on('error', (e) => {
          console.error(e);
        });
        this.connection.on('close', () => {
          this.channel.close();
          this.connection.close();
          this.createConnection();
        });
      });
  }

  private connectChannel() {
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

  static getInstance() {
    if (!this.instance) this.instance = new RabbitClient();

    return this.instance;
  }
}
