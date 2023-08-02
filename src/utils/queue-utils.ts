import amqp from 'amqplib';
import { CONSTANTS } from '../config';
import { DataEvent } from '../models/events-model';
import logger from '../logger';

export class QueueUtils {
  public static async sendMessage(message: DataEvent) {
    try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();

      const queueName = CONSTANTS.DATA_EVENT_QUEUE;

      await channel.assertQueue(queueName);
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

      logger.debug('Message sent to RabbitMQ');
      await channel.close();
      await connection.close();
    } catch (error) {
      logger.error('Error sending message:', error);
    }
  }
}
